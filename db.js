/**
 * db.js — Doce Caramelo
 * Camada de persistência usando localStorage.
 * Funciona 100% no GitHub Pages (sem servidor necessário).
 * Os dados ficam salvos no navegador do dispositivo.
 * Use os botões "Exportar / Importar" para fazer backup.
 */

const DB = (function () {
  const KEY = 'doce_caramelo_v3';

  function save(state) {
    try {
      // Remove itens não-serializáveis antes de salvar
      const clean = JSON.parse(JSON.stringify(state, (k, v) => {
        if (k === '_metaInterval') return undefined; // não salvar timers
        return v;
      }));
      localStorage.setItem(KEY, JSON.stringify(clean));
      return true;
    } catch (e) {
      console.error('[DB] Erro ao salvar:', e);
      return false;
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error('[DB] Erro ao carregar:', e);
      return null;
    }
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  function size() {
    const raw = localStorage.getItem(KEY);
    if (!raw) return '0 KB';
    return (raw.length / 1024).toFixed(1) + ' KB';
  }

  return { save, load, clear, size };
})();
