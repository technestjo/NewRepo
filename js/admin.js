// ============================================================
// js/admin.js  –  Admin Panel with Stage Manager
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    if (!LetterDB.isLoggedIn()) { window.location.href = 'admin-login.html'; return; }
    LetterDB.init();

    // ── Sidebar nav ──
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-page]');
    const adminPages = document.querySelectorAll('.admin-page');
    function showPage(pageId) {
        adminPages.forEach(p => p.classList.toggle('active', p.id === pageId));
        sidebarLinks.forEach(l => l.classList.toggle('active', l.dataset.page === pageId));
        if (pageId === 'page-dashboard') renderDashboard();
        if (pageId === 'page-letters') renderLettersTable();
    }
    sidebarLinks.forEach(link => link.addEventListener('click', e => { e.preventDefault(); showPage(link.dataset.page); }));
    showPage('page-dashboard');

    // ── Logout ──
    document.getElementById('logout-btn')?.addEventListener('click', () => { LetterDB.logout(); window.location.href = 'admin-login.html'; });

    // ────────────────────────────────────────────
    // CUSTOM CONFIRM DIALOG
    // ────────────────────────────────────────────
    function customConfirm(message) {
        return new Promise(resolve => {
            document.getElementById('admin-confirm-dialog')?.remove();
            const overlay = document.createElement('div');
            overlay.id = 'admin-confirm-dialog';
            overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px';
            overlay.innerHTML = `<div style="background:var(--bg-2);border:1px solid var(--border-glow);border-radius:var(--radius-xl);padding:36px 40px;max-width:420px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.8)">
                <div style="font-size:2.5rem;margin-bottom:16px">🗑</div>
                <p style="color:var(--papyrus);font-size:1rem;line-height:1.6;margin-bottom:28px">${message}</p>
                <div style="display:flex;gap:12px;justify-content:center">
                    <button id="confirm-yes" class="btn btn-danger" style="min-width:100px">Delete</button>
                    <button id="confirm-no"  class="btn btn-outline" style="min-width:100px">Cancel</button>
                </div></div>`;
            document.body.appendChild(overlay);
            overlay.querySelector('#confirm-yes').onclick = () => { overlay.remove(); resolve(true); };
            overlay.querySelector('#confirm-no').onclick = () => { overlay.remove(); resolve(false); };
            overlay.onclick = e => { if (e.target === overlay) { overlay.remove(); resolve(false); } };
        });
    }

    // ────────────────────────────────────────────
    // DASHBOARD
    // ────────────────────────────────────────────
    function renderDashboard() {
        const letters = LetterDB.getAll();
        const totalStages = letters.reduce((a, l) => a + (l.stages?.length || 0), 0);
        const civs = [...new Set(letters.map(l => l.civilization))].length;
        document.getElementById('stat-total').textContent = letters.length;
        document.getElementById('stat-stages').textContent = totalStages;
        document.getElementById('stat-civs').textContent = civs;
        const recentEl = document.getElementById('recent-letters');
        if (recentEl) recentEl.innerHTML = letters.slice(0, 6).map(l => `
            <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)">
              <div style="width:44px;height:44px;background:var(--surface);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;overflow:hidden;flex-shrink:0">
                ${l.thumbnailBase64 ? `<img src="${l.thumbnailBase64}" style="width:100%;height:100%;object-fit:cover;border-radius:6px">` : (l.phoenicianSymbol || '𐤀')}
              </div>
              <div style="flex:1;min-width:0">
                <div style="font-weight:600;color:var(--papyrus)">${l.nameEn}</div>
                <div style="font-size:0.75rem;color:var(--text-muted)">${l.code} • ${l.stages?.length || 0} stages</div>
              </div>
              <button class="btn btn-sm btn-outline" onclick="adminEditLetter(${l.id})">Edit</button>
            </div>`).join('');
    }

    // ────────────────────────────────────────────
    // LETTERS TABLE
    // ────────────────────────────────────────────
    function renderLettersTable(query = '') {
        let letters = LetterDB.getAll();
        if (query) { const q = query.toLowerCase(); letters = letters.filter(l => l.nameEn.toLowerCase().includes(q) || l.nameAr.includes(q) || l.code.toLowerCase().includes(q)); }
        const tbody = document.getElementById('letters-tbody');
        if (!tbody) return;
        tbody.innerHTML = letters.map(l => `<tr>
            <td class="td-code">${l.code}</td>
            <td>${l.thumbnailBase64 ? `<img src="${l.thumbnailBase64}" style="width:36px;height:36px;object-fit:cover;border-radius:6px;border:1px solid var(--border)">` : `<span style="font-size:1.4rem">${l.phoenicianSymbol || '—'}</span>`}</td>
            <td><strong style="color:var(--papyrus)">${l.nameEn}</strong><br><span style="font-family:Amiri,serif;color:var(--gold);font-size:0.9rem">${l.nameAr}</span></td>
            <td style="color:var(--text-muted);font-size:0.85rem">${l.meaning || '—'}</td>
            <td style="color:var(--text-muted);font-size:0.85rem">${l.stages?.length || 0}</td>
            <td><div class="td-actions">
                <button class="btn btn-sm btn-outline" onclick="adminEditLetter(${l.id})">✏ Edit</button>
                <button class="btn btn-sm btn-danger"  onclick="adminDeleteLetter(${l.id},'${l.nameEn.replace(/'/g, "\\'")}')">🗑 Del</button>
            </div></td></tr>`).join('') || `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:32px">No letters found</td></tr>`;
    }
    document.getElementById('admin-search')?.addEventListener('input', e => renderLettersTable(e.target.value));

    // ────────────────────────────────────────────
    // STAGE MANAGER (in-memory list of stages)
    // ────────────────────────────────────────────
    let editingId = null;
    let currentThumbnailBase64 = null;
    let stagesList = []; // [{nameEn, nameAr, period, description, descriptionAr, imageBase64, svgContent}]

    function makeEmptyStage() {
        return { nameEn: '', nameAr: '', period: '', description: '', descriptionAr: '', textSymbol: '', imageBase64: null, svgContent: '' };
    }

    function renderStagesEditor() {
        const container = document.getElementById('stages-editor');
        if (!container) return;
        if (stagesList.length === 0) {
            container.innerHTML = `<div style="text-align:center;padding:28px;color:var(--text-muted);font-size:.9rem">
                No stages yet. Click "+ Add Stage" to add the first evolution step.</div>`;
            return;
        }
        container.innerHTML = stagesList.map((s, i) => `
        <div class="stage-item" data-idx="${i}" style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-md);padding:20px;margin-bottom:16px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
                <div style="font-family:'Cinzel',serif;font-size:.85rem;color:var(--gold)">Stage ${i + 1}</div>
                <div style="display:flex;gap:8px">
                    ${i > 0 ? `<button type="button" class="btn btn-sm btn-outline stage-up" data-idx="${i}" title="Move up">↑</button>` : ''}
                    ${i < stagesList.length - 1 ? `<button type="button" class="btn btn-sm btn-outline stage-down" data-idx="${i}" title="Move down">↓</button>` : ''}
                    <button type="button" class="btn btn-sm btn-danger stage-del" data-idx="${i}">✕ Remove</button>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
                <div><label style="font-size:.72rem;color:var(--gold-dim);display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:.08em">Stage Name (EN)</label>
                     <input class="form-input stage-field" data-idx="${i}" data-key="nameEn" value="${e(s.nameEn)}" placeholder="e.g. Proto-Sinaitic"></div>
                <div><label style="font-size:.72rem;color:var(--gold-dim);display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:.08em">Stage Name (AR)</label>
                     <input class="form-input stage-field" data-idx="${i}" data-key="nameAr" value="${e(s.nameAr)}" placeholder="اسم المرحلة" dir="rtl"></div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
                <div><label style="font-size:.72rem;color:var(--gold-dim);display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:.08em">Period / Era</label>
                     <input class="form-input stage-field" data-idx="${i}" data-key="period" value="${e(s.period)}" placeholder="e.g. ~1050 BCE"></div>
                <div><label style="font-size:.72rem;color:var(--gold-dim);display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:.08em">Text Symbol (Large)</label>
                     <input class="form-input stage-field" data-idx="${i}" data-key="textSymbol" value="${e(s.textSymbol)}" placeholder="e.g. 𐡀" style="font-size:1.4rem;text-align:center"></div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
                <div><label style="font-size:.72rem;color:var(--gold-dim);display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:.08em">Description (EN)</label>
                     <textarea class="form-textarea stage-field" data-idx="${i}" data-key="description" placeholder="Describe this evolution stage…" style="min-height:80px">${e(s.description)}</textarea></div>
                <div><label style="font-size:.72rem;color:var(--gold-dim);display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:.08em">Description (AR)</label>
                     <textarea class="form-textarea stage-field" data-idx="${i}" data-key="descriptionAr" placeholder="وصف المرحلة…" dir="rtl" style="min-height:80px">${e(s.descriptionAr)}</textarea></div>
            </div>
            <div style="display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap">
                <div>
                    <label style="font-size:.72rem;color:var(--gold-dim);display:block;margin-bottom:6px;text-transform:uppercase;letter-spacing:.08em">Stage Image (optional)</label>
                    <input type="file" id="stage-img-${i}" accept="image/*" style="display:none">
                    <label for="stage-img-${i}" class="btn btn-sm btn-outline" style="cursor:pointer">📷 Choose Image</label>
                    ${s.imageBase64 ? `<button type="button" class="btn btn-sm btn-danger stage-img-clear" data-idx="${i}" style="margin-left:6px">✕</button>` : ''}
                </div>
                ${s.imageBase64 ? `<img src="${s.imageBase64}" style="max-width:100px;max-height:80px;border-radius:8px;border:1px solid var(--border-glow);object-fit:contain">` : '<span style="font-size:.75rem;color:var(--text-muted);align-self:flex-end">No image</span>'}
            </div>
        </div>`).join('');

        // Bind events
        container.querySelectorAll('.stage-field').forEach(input => {
            input.addEventListener('input', ev => {
                stagesList[+ev.target.dataset.idx][ev.target.dataset.key] = ev.target.value;
            });
        });
        container.querySelectorAll('.stage-del').forEach(btn => {
            btn.addEventListener('click', () => { stagesList.splice(+btn.dataset.idx, 1); renderStagesEditor(); });
        });
        container.querySelectorAll('.stage-up').forEach(btn => {
            btn.addEventListener('click', () => { const i = +btn.dataset.idx;[stagesList[i - 1], stagesList[i]] = [stagesList[i], stagesList[i - 1]]; renderStagesEditor(); });
        });
        container.querySelectorAll('.stage-down').forEach(btn => {
            btn.addEventListener('click', () => { const i = +btn.dataset.idx;[stagesList[i + 1], stagesList[i]] = [stagesList[i], stagesList[i + 1]]; renderStagesEditor(); });
        });
        container.querySelectorAll('[id^="stage-img-"]').forEach(fileInput => {
            fileInput.addEventListener('change', ev => {
                const i = +fileInput.id.replace('stage-img-', '');
                const file = ev.target.files[0]; if (!file) return;
                if (file.size > 800 * 1024) { showToast('Stage image too large — max 800 KB', 'error'); ev.target.value = ''; return; }
                const reader = new FileReader();
                reader.onload = r => { stagesList[i].imageBase64 = r.target.result; renderStagesEditor(); };
                reader.readAsDataURL(file);
            });
        });
        container.querySelectorAll('.stage-img-clear').forEach(btn => {
            btn.addEventListener('click', () => { stagesList[+btn.dataset.idx].imageBase64 = null; renderStagesEditor(); });
        });
    }

    function e(str) { return (str || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

    document.getElementById('add-stage-btn')?.addEventListener('click', () => {
        stagesList.push(makeEmptyStage());
        renderStagesEditor();
    });

    // ────────────────────────────────────────────
    // SYMBOL PICKER
    // ────────────────────────────────────────────
    const PHOENICIAN_SYMBOLS = ['𐤀', '𐤁', '𐤂', '𐤃', '𐤄', '𐤅', '𐤆', '𐤇', '𐤈', '𐤉', '𐤊', '𐤋', '𐤌', '𐤍', '𐤎', '𐤏', '𐤐', '𐤑', '𐤒', '𐤓', '𐤔', '𐤕', 'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'];
    const symbolPicker = document.getElementById('symbol-picker');
    if (symbolPicker) {
        symbolPicker.innerHTML = PHOENICIAN_SYMBOLS.map(s => `<button type="button" class="sym-pick-btn" data-sym="${s}">${s}</button>`).join('');
        symbolPicker.addEventListener('click', ev => {
            const btn = ev.target.closest('.sym-pick-btn'); if (!btn) return;
            const target = document.getElementById('sym-pick-target')?.value || 'ph';
            const input = document.getElementById(target === 'ar' ? 'form-arSymbol' : 'form-phSymbol');
            if (input) { input.value = btn.dataset.sym; updateSymbolPreview(); }
        });
    }
    function updateSymbolPreview() {
        const ph = document.getElementById('form-phSymbol')?.value || '';
        const ar = document.getElementById('form-arSymbol')?.value || '';
        const prev = document.getElementById('symbol-preview');
        if (prev) prev.innerHTML = [
            ph ? `<span title="Phoenician" style="font-size:2rem">${ph}</span>` : '',
            ar ? `<span title="Arabic" style="font-family:Amiri,serif;font-size:2rem;color:var(--gold)">${ar}</span>` : ''
        ].filter(Boolean).join('<span style="color:var(--text-muted);margin:0 10px">→</span>') || '<span style="font-size:.8rem;color:var(--text-muted)">Pick a symbol above</span>';
    }
    document.getElementById('form-phSymbol')?.addEventListener('input', updateSymbolPreview);
    document.getElementById('form-arSymbol')?.addEventListener('input', updateSymbolPreview);

    // ────────────────────────────────────────────
    // THUMBNAIL IMAGE UPLOAD
    // ────────────────────────────────────────────
    const imageInput = document.getElementById('form-image-upload');
    imageInput?.addEventListener('change', ev => {
        const file = ev.target.files[0]; if (!file) return;
        if (file.size > 600 * 1024) { showToast('Image too large — max 600 KB', 'error'); ev.target.value = ''; return; }
        const reader = new FileReader();
        reader.onload = r => { currentThumbnailBase64 = r.target.result; updateImagePreview(); };
        reader.readAsDataURL(file);
    });
    document.getElementById('form-image-clear')?.addEventListener('click', () => {
        currentThumbnailBase64 = null;
        if (imageInput) imageInput.value = '';
        clearImagePreview();
    });
    function updateImagePreview() {
        const prev = document.getElementById('image-preview-area');
        if (prev) prev.innerHTML = currentThumbnailBase64
            ? `<img src="${currentThumbnailBase64}" style="max-width:160px;max-height:120px;border-radius:var(--radius-md);border:1px solid var(--border-glow);object-fit:cover"><p style="font-size:.75rem;color:var(--gold);margin-top:6px">✓ Image loaded</p>`
            : `<span style="font-size:.8rem;color:var(--text-muted)">No image selected</span>`;
    }
    function clearImagePreview() {
        const prev = document.getElementById('image-preview-area');
        if (prev) prev.innerHTML = `<span style="font-size:.8rem;color:var(--text-muted)">No image selected</span>`;
    }

    // ────────────────────────────────────────────
    // ADD / EDIT LETTER
    // ────────────────────────────────────────────
    window.adminEditLetter = function (id) {
        const l = LetterDB.getById(id); if (!l) return;
        editingId = id;
        currentThumbnailBase64 = l.thumbnailBase64 || null;
        stagesList = (l.stages || []).map(s => ({
            nameEn: s.nameEn || '', nameAr: s.nameAr || '', period: s.period || '',
            description: s.description || '', descriptionAr: s.descriptionAr || '',
            textSymbol: s.textSymbol || '',
            imageBase64: s.imageBase64 || null, svgContent: s.svgContent || ''
        }));
        document.getElementById('form-nameEn').value = l.nameEn || '';
        document.getElementById('form-nameAr').value = l.nameAr || '';
        document.getElementById('form-civ').value = l.civilization || 'Phoenician / Canaanite';
        document.getElementById('form-order').value = l.order || '';
        document.getElementById('form-meaning').value = l.meaning || '';
        document.getElementById('form-meaningAr').value = l.meaningAr || '';
        document.getElementById('form-phSymbol').value = l.phoenicianSymbol || '';
        document.getElementById('form-arSymbol').value = l.arabicSymbol || '';
        document.getElementById('form-desc').value = l.description || '';
        document.getElementById('form-descAr').value = l.descriptionAr || '';
        document.getElementById('form-title').textContent = `Edit Letter: ${l.nameEn}`;
        updateSymbolPreview(); updateImagePreview(); renderStagesEditor();
        showPage('page-add');
    };

    window.adminDeleteLetter = async function (id, name) {
        const ok = await customConfirm(`Delete "<strong style="color:var(--gold)">${name}</strong>"?<br><span style="font-size:.85rem;color:var(--text-muted)">This cannot be undone.</span>`);
        if (!ok) return;
        LetterDB.delete(id);
        showToast(`"${name}" deleted.`, 'success');
        renderLettersTable(); renderDashboard();
    };

    document.getElementById('add-new-btn')?.addEventListener('click', () => {
        editingId = null; currentThumbnailBase64 = null;
        stagesList = [
            { nameEn: 'Egyptian Hieroglyphic', nameAr: 'الهيروغليفية المصرية', period: '', description: '', descriptionAr: '', textSymbol: '', imageBase64: null, svgContent: '' },
            { nameEn: 'Proto-Sinaitic', nameAr: 'السينائية الأولية', period: '', description: '', descriptionAr: '', textSymbol: '', imageBase64: null, svgContent: '' },
            { nameEn: 'Phoenician', nameAr: 'الفينيقية', period: '', description: '', descriptionAr: '', textSymbol: '', imageBase64: null, svgContent: '' },
            { nameEn: 'Aramaic', nameAr: 'الآرامية', period: '', description: '', descriptionAr: '', textSymbol: '', imageBase64: null, svgContent: '' },
            { nameEn: 'Nabataean', nameAr: 'النبطية', period: '', description: '', descriptionAr: '', textSymbol: '', imageBase64: null, svgContent: '' },
            { nameEn: 'Arabic', nameAr: 'العربية', period: '', description: '', descriptionAr: '', textSymbol: '', imageBase64: null, svgContent: '' }
        ];
        document.getElementById('letter-form')?.reset();
        document.getElementById('form-title').textContent = 'Add New Letter';
        updateSymbolPreview(); clearImagePreview(); renderStagesEditor();
        showPage('page-add');
    });

    // Form submit
    document.getElementById('letter-form')?.addEventListener('submit', ev => {
        ev.preventDefault();
        // Build stages — merge imageBase64 into the stage as a pseudo-SVG fallback
        const finalStages = stagesList.map(s => ({
            nameEn: s.nameEn, nameAr: s.nameAr, period: s.period,
            description: s.description, descriptionAr: s.descriptionAr,
            textSymbol: s.textSymbol,
            svgContent: s.svgContent || '',
            imageBase64: s.imageBase64 || null
        }));
        const data = {
            nameEn: document.getElementById('form-nameEn').value.trim(),
            nameAr: document.getElementById('form-nameAr').value.trim(),
            civilization: document.getElementById('form-civ').value.trim(),
            order: parseInt(document.getElementById('form-order').value) || 999,
            meaning: document.getElementById('form-meaning').value.trim(),
            meaningAr: document.getElementById('form-meaningAr').value.trim(),
            phoenicianSymbol: document.getElementById('form-phSymbol').value.trim(),
            arabicSymbol: document.getElementById('form-arSymbol').value.trim(),
            description: document.getElementById('form-desc').value.trim(),
            descriptionAr: document.getElementById('form-descAr').value.trim(),
            thumbnailBase64: currentThumbnailBase64 || null,
            stages: finalStages
        };
        if (!data.nameEn) { showToast('English name is required.', 'error'); return; }
        if (editingId) {
            LetterDB.update(editingId, data);
            showToast(`"${data.nameEn}" updated!`, 'success');
        } else {
            LetterDB.add(data);
            showToast(`"${data.nameEn}" added!`, 'success');
        }
        editingId = null; currentThumbnailBase64 = null; stagesList = [];
        document.getElementById('letter-form')?.reset();
        clearImagePreview(); renderDashboard();
        showPage('page-letters'); renderLettersTable();
    });
    document.getElementById('cancel-form-btn')?.addEventListener('click', () => showPage('page-letters'));

    // ────────────────────────────────────────────
    // RESET / IMPORT / EXPORT
    // ────────────────────────────────────────────
    document.getElementById('reset-data-btn')?.addEventListener('click', async () => {
        const ok = await customConfirm('Reset all letters to default seed data?<br><span style="font-size:.85rem;color:var(--text-muted)">Custom additions will be lost.</span>');
        if (!ok) return;
        localStorage.removeItem(LetterDB.STORAGE_KEY);
        localStorage.removeItem(LetterDB.VERSION_KEY);
        LetterDB.init();
        showToast('Data reset to defaults!', 'success');
        renderDashboard(); renderLettersTable();
    });
    document.getElementById('export-btn')?.addEventListener('click', () => { LetterDB.exportJSON(); showToast('Exported!', 'success'); });
    document.getElementById('import-file')?.addEventListener('change', ev => {
        const file = ev.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = r => {
            const ok = LetterDB.importJSON(r.target.result);
            showToast(ok ? 'Import successful!' : 'Invalid JSON!', ok ? 'success' : 'error');
            if (ok) { renderDashboard(); renderLettersTable(); }
            ev.target.value = '';
        };
        reader.readAsText(file);
    });

    // ── Toast ──
    function showToast(msg, type = 'success') {
        let c = document.querySelector('.toast-container');
        if (!c) { c = document.createElement('div'); c.className = 'toast-container'; document.body.appendChild(c); }
        const t = document.createElement('div');
        t.className = `toast ${type}`;
        t.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : '✗'}</span>${msg}`;
        c.appendChild(t);
        requestAnimationFrame(() => t.classList.add('show'));
        setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, 3200);
    }
    renderStagesEditor();
});
