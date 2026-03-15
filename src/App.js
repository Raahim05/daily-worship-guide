import { useState, useEffect } from 'react';
import { DEFAULT_SCHEDULE, TYPE_STYLES } from './data';
import './App.css';

let idCounter = Date.now();
function uid() { return 'id' + (idCounter++); }

function loadStorage(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
  catch { return def; }
}
function saveStorage(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ── Modal ──────────────────────────────────────────────
function Modal({ title, onCancel, onSave, saveLabel = 'Save', children }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-title">{title}</div>
        {children}
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn-save" onClick={onSave}>{saveLabel}</button>
        </div>
      </div>
    </div>
  );
}

// ── Item row ───────────────────────────────────────────
function ItemRow({ item, isChecked, isEditing, onCheck, onEdit, onDelete, onSaveEdit, onCancelEdit }) {
  const ts = TYPE_STYLES[item.type] || TYPE_STYLES.prep;
  const [name, setName] = useState(item.name);
  const [detail, setDetail] = useState(item.detail || '');
  const [type, setType] = useState(item.type);
  const [duration, setDuration] = useState(item.duration || '');

  useEffect(() => {
    setName(item.name); setDetail(item.detail || '');
    setType(item.type); setDuration(item.duration || '');
  }, [item]);

  if (isEditing) {
    return (
      <div className="item" style={{ background: ts.bg, borderLeftColor: ts.border }}>
        <div className="edit-inline">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name *" />
          <input value={detail} onChange={e => setDetail(e.target.value)} placeholder="Detail (optional)" />
          <select value={type} onChange={e => setType(e.target.value)}>
            {Object.keys(TYPE_STYLES).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration" className="input-sm" />
          <button className="btn-save" onClick={() => onSaveEdit({ name, detail, type, duration })}>Save</button>
          <button className="btn-cancel" onClick={onCancelEdit}>✕</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`item ${isChecked ? 'checked' : ''}`} style={{ background: ts.bg, borderLeftColor: ts.border }}>
      <div className={`item-check ${isChecked ? 'checked' : ''}`} onClick={onCheck}>{isChecked ? '✓' : ''}</div>
      <div className="item-body">
        <div className="item-name">{item.name}</div>
        {item.detail && <div className="item-detail">{item.detail}</div>}
        <div className="item-actions">
          <button className="item-act-btn" title="Edit" onClick={onEdit}>✏️</button>
          <button className="item-act-btn del" title="Delete" onClick={onDelete}>🗑</button>
        </div>
      </div>
      <div className="item-meta">
        {item.duration && <span className="item-dur">{item.duration}</span>}
        <span className="item-type-label" style={{ color: ts.color }}>{ts.label}</span>
      </div>
    </div>
  );
}

// ── Add item form ──────────────────────────────────────
function AddItemForm({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [type, setType] = useState('prayer');
  const [duration, setDuration] = useState('');

  return (
    <div className="add-item-form">
      <div className="form-row">
        <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Worship act name *" />
        <input className="form-input" value={detail} onChange={e => setDetail(e.target.value)} placeholder="Detail (optional)" />
      </div>
      <div className="form-row">
        <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
          {Object.keys(TYPE_STYLES).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input className="form-input-sm" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration" />
      </div>
      <div className="form-actions">
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button className="btn-save" onClick={() => { if (name.trim()) onSave({ name: name.trim(), detail, type, duration }); }}>Add act</button>
      </div>
    </div>
  );
}

// ── Block ──────────────────────────────────────────────
function Block({ block, bi, checked, onCheck, onDeleteBlock, onUpdateBlock, onUpdatePrayerTime }) {
  const [isOpen, setIsOpen] = useState(false);
  const [addingItem, setAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const total = block.items.length;
  const cnt = block.items.filter((_, ii) => checked[`${bi}-${ii}`]).length;
  const done = total > 0 && cnt === total;

  const handleAddItem = (itemData) => {
    const updated = { ...block, items: [...block.items, { id: uid(), ...itemData }] };
    onUpdateBlock(bi, updated);
    setAddingItem(false);
  };

  const handleDeleteItem = (ii) => {
    if (!window.confirm('Delete this act?')) return;
    const items = block.items.filter((_, i) => i !== ii);
    onUpdateBlock(bi, { ...block, items });
  };

  const handleSaveEdit = (ii, data) => {
    const items = block.items.map((item, i) => i === ii ? { ...item, ...data } : item);
    onUpdateBlock(bi, { ...block, items });
    setEditingItem(null);
  };

  return (
    <div className={`block ${isOpen ? 'open' : ''}`}>
      {/* Header */}
      <div className="block-header" onClick={() => setIsOpen(o => !o)}>
        <div className="bleft">
          <span className="block-icon">{block.icon || '🕌'}</span>
          <div>
            <div className="period">{block.period}</div>
            <div className="time-row">
              <span className="time-tag">{block.time}</span>
              <button className="prayer-time-badge" onClick={e => { e.stopPropagation(); onUpdatePrayerTime(bi); }}>
                {block.prayerTime}
              </button>
            </div>
          </div>
        </div>
        <div className="bright">
          {done ? <span className="done-badge">Done ✓</span> : <span className="prog-pill">{cnt} / {total}</span>}
          <button className="del-block-btn" onClick={e => { e.stopPropagation(); onDeleteBlock(bi); }}>✕</button>
          <span className={`chevron ${isOpen ? 'open' : ''}`}>▾</span>
        </div>
      </div>

      {/* Body */}
      {isOpen && (
        <div className="block-body">
          {block.hadith && (
            <div className="hadith-box">
              <span className="hadith-icon">📖</span>
              <div>
                <div className="hadith-text">"{block.hadith}"</div>
                <div className="hadith-src">— {block.hadithSrc}</div>
              </div>
            </div>
          )}
          <div className="items-list">
            {block.items.map((item, ii) => (
              <ItemRow
                key={item.id || ii}
                item={item}
                isChecked={!!checked[`${bi}-${ii}`]}
                isEditing={editingItem === ii}
                onCheck={() => onCheck(bi, ii)}
                onEdit={() => setEditingItem(ii)}
                onDelete={() => handleDeleteItem(ii)}
                onSaveEdit={(data) => handleSaveEdit(ii, data)}
                onCancelEdit={() => setEditingItem(null)}
              />
            ))}
            <div className="add-item-row">
              {addingItem
                ? <AddItemForm onSave={handleAddItem} onCancel={() => setAddingItem(false)} />
                : <button className="add-item-trigger" onClick={() => setAddingItem(true)}>+ Add worship act</button>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── App ────────────────────────────────────────────────
export default function App() {
  const [blocks, setBlocks] = useState(() => loadStorage('dwg-blocks-v2', DEFAULT_SCHEDULE));
  const [checked, setChecked] = useState(() => loadStorage('dwg-checked-v2', {}));
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [editingTimeFor, setEditingTimeFor] = useState(null);
  const [newBlock, setNewBlock] = useState({ period: '', time: '', prayerTime: '00:00', icon: '' });
  const [newTime, setNewTime] = useState('00:00');

  useEffect(() => { saveStorage('dwg-blocks-v2', blocks); }, [blocks]);
  useEffect(() => { saveStorage('dwg-checked-v2', checked); }, [checked]);

  const totalItems = blocks.reduce((a, b) => a + b.items.length, 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const progress = totalItems ? Math.round((totalChecked / totalItems) * 100) : 0;

  const handleCheck = (bi, ii) => {
    const key = `${bi}-${ii}`;
    setChecked(c => ({ ...c, [key]: !c[key] }));
  };

  const handleDeleteBlock = (bi) => {
    if (!window.confirm('Delete this entire block?')) return;
    setBlocks(bs => bs.filter((_, i) => i !== bi));
    const newChecked = {};
    Object.keys(checked).forEach(k => {
      const [b, i] = k.split('-').map(Number);
      if (b < bi) newChecked[k] = checked[k];
      else if (b > bi) newChecked[`${b - 1}-${i}`] = checked[k];
    });
    setChecked(newChecked);
  };

  const handleUpdateBlock = (bi, updated) => {
    setBlocks(bs => bs.map((b, i) => i === bi ? updated : b));
  };

  const handleAddBlock = () => {
    if (!newBlock.period.trim()) return;
    setBlocks(bs => [...bs, {
      id: uid(), period: newBlock.period.trim(),
      time: newBlock.time.trim() || 'Custom',
      prayerTime: newBlock.prayerTime || '00:00',
      icon: newBlock.icon.trim() || '🕌',
      tag: 'Custom block', hadith: '', hadithSrc: '', items: [],
    }]);
    setNewBlock({ period: '', time: '', prayerTime: '00:00', icon: '' });
    setShowBlockModal(false);
  };

  const handleUpdatePrayerTime = (bi) => {
    setNewTime(blocks[bi].prayerTime || '00:00');
    setEditingTimeFor(bi);
  };

  const handleSavePrayerTime = () => {
    setBlocks(bs => bs.map((b, i) => i === editingTimeFor ? { ...b, prayerTime: newTime } : b));
    setEditingTimeFor(null);
  };

  const resetChecks = () => setChecked({});
  const resetAll = () => {
    if (window.confirm('Reset everything to default? This cannot be undone.')) {
      setBlocks(JSON.parse(JSON.stringify(DEFAULT_SCHEDULE)));
      setChecked({});
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="bismillah">﷽</div>
        <h1 className="app-title">Daily Worship Guide</h1>
        <p className="app-subtitle">دليل العبادة اليومية</p>
        <div className="prog-wrap">
          <div className="prog-label">
            <span>Daily progress</span>
            <span>{totalChecked} / {totalItems} completed</span>
          </div>
          <div className="prog-track">
            <div className="prog-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      {/* Legend */}
      <div className="legend">
        {[['#4299e1','Prayer'],['#48bb78','Dhikr'],['#ed8936','Quran'],['#9f7aea',"Du'a"],['#f56565','Deed'],['#888','Prep']].map(([c,l]) => (
          <div className="leg-item" key={l}>
            <div className="leg-dot" style={{ background: c }} />{l}
          </div>
        ))}
      </div>

      {/* Add block button */}
      <button className="add-block-btn" onClick={() => setShowBlockModal(true)}>+ Add new time block</button>

      {/* Schedule */}
      <main>
        {blocks.map((block, bi) => (
          <Block
            key={block.id || bi}
            block={block} bi={bi} checked={checked}
            onCheck={handleCheck}
            onDeleteBlock={handleDeleteBlock}
            onUpdateBlock={handleUpdateBlock}
            onUpdatePrayerTime={handleUpdatePrayerTime}
          />
        ))}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="quote">"The most beloved deeds to Allah are the most consistent,<br />even if they are small."</p>
        <p className="hadith-ref">— Bukhari &amp; Muslim</p>
        <p className="ameen">آمين</p>
        <div className="footer-btns">
          <button className="footer-btn" onClick={resetChecks}>Reset checkboxes</button>
          <button className="footer-btn" onClick={resetAll}>Reset everything</button>
        </div>
      </footer>

      {/* New block modal */}
      {showBlockModal && (
        <Modal title="New time block" onCancel={() => setShowBlockModal(false)} onSave={handleAddBlock} saveLabel="Add block">
          <div className="modal-field">
            <label className="modal-label">PERIOD NAME *</label>
            <input className="modal-input" value={newBlock.period} onChange={e => setNewBlock(b => ({ ...b, period: e.target.value }))} placeholder="e.g. Tahajjud, Duha, Jumu'ah..." />
          </div>
          <div className="modal-row">
            <div className="modal-field" style={{ flex: 1 }}>
              <label className="modal-label">DISPLAY TIME</label>
              <input className="modal-input" value={newBlock.time} onChange={e => setNewBlock(b => ({ ...b, time: e.target.value }))} placeholder="e.g. ~3:30 AM" />
            </div>
            <div className="modal-field" style={{ flex: 1 }}>
              <label className="modal-label">CLOCK TIME</label>
              <input className="modal-input" type="time" value={newBlock.prayerTime} onChange={e => setNewBlock(b => ({ ...b, prayerTime: e.target.value }))} />
            </div>
          </div>
          <div className="modal-field">
            <label className="modal-label">ICON (emoji)</label>
            <input className="modal-input" value={newBlock.icon} onChange={e => setNewBlock(b => ({ ...b, icon: e.target.value }))} placeholder="🕌" maxLength={4} />
          </div>
        </Modal>
      )}

      {/* Edit prayer time modal */}
      {editingTimeFor !== null && (
        <Modal title={`Edit prayer time — ${blocks[editingTimeFor]?.period}`} onCancel={() => setEditingTimeFor(null)} onSave={handleSavePrayerTime} saveLabel="Save">
          <div className="modal-field">
            <label className="modal-label">PRAYER TIME</label>
            <input className="modal-input" type="time" value={newTime} onChange={e => setNewTime(e.target.value)} />
          </div>
        </Modal>
      )}
    </div>
  );
}
