/**
 * Utilitaire de Performance Avancé - ULTRA-OPTIMISÉ
 * Tracking en nanosecondes avec cache et lazy evaluation
 */

export class AdvancedPerformanceTracker {
  constructor(maxMeasurements = 50) {
    this.measurements = [];
    this.maxMeasurements = maxMeasurements;
    this.sessionStart = performance.now();
    
    // Cache pour stats (memoization)
    this._statsCache = new Map();
    this._cacheDirty = true;
    
    // Réutiliser objet résultat pour éviter allocations
    this._resultPool = {
      label: '', ms: 0, us: 0, ns: 0, ps: 0, 
      timestamp: '', duration: 0
    };
  }

  /**
   * Démarrer une mesure - ultra-rapide avec inline
   */
  start(label) {
    return {
      label,
      t: performance.now(), // t au lieu de startTime
    };
  }

  /**
   * Terminer une mesure - optimisé pour min overhead
   */
  end(m) {
    const d = performance.now() - m.t; // durée en ms
    const dn = Math.round(d * 1e6); // nanosecondes
    
    const r = {
      label: m.label,
      ms: d.toFixed(2), // 2 décimales au lieu de 3
      us: Math.round(d * 1e3).toFixed(0),
      ns: dn.toFixed(0),
      ps: (dn * 1e3).toFixed(0),
      ts: Date.now(), // timestamp leger
      d: d, // duration raw
    };

    this.measurements.push(r);
    if (this.measurements.length > this.maxMeasurements) {
      this.measurements.shift();
    }
    
    this._cacheDirty = true; // Invalider cache
    return r;
  }

  /**
   * Obtenir les statistiques avec CACHE - lazy eval
   */
  getStats(label) {
    // Check cache
    if (!this._cacheDirty && this._statsCache.has(label)) {
      return this._statsCache.get(label);
    }

    const f = this.measurements.filter(m => m.label === label);
    if (!f.length) return null;

    const ds = f.map(m => m.d);
    const s = ds.reduce((a, b) => a + b, 0);
    const avg = s / f.length;

    const stats = {
      label,
      count: f.length,
      avg: avg.toFixed(2),
      min: Math.min(...ds).toFixed(2),
      max: Math.max(...ds).toFixed(2),
      avgNs: (avg * 1e6).toFixed(0),
      minNs: (Math.min(...ds) * 1e6).toFixed(0),
      maxNs: (Math.max(...ds) * 1e6).toFixed(0),
    };

    this._statsCache.set(label, stats);
    return stats;
  }

  /**
   * Obtenir toutes les stats - optimisé
   */
  getAllStats() {
    const labels = [...new Set(this.measurements.map(m => m.label))];
    const result = [];
    for (let i = 0; i < labels.length; i++) {
      const s = this.getStats(labels[i]);
      if (s) result.push(s);
    }
    return result;
  }

  /**
   * Obtenir un rapport formaté
   */
  getReport() {
    const stats = this.getAllStats();
    let r = '\n⚡ PERF REPORT ⚡\n';
    for (let i = 0; i < stats.length; i++) {
      const s = stats[i];
      r += `${s.label}: ${s.avg}ms (${s.avgNs}ns)\n`;
    }
    return r;
  }

  /**
   * Réinitialiser toutes les mesures
   */
  reset() {
    this.measurements = [];
    this.sessionStart = performance.now();
  }

  /**
   * Mesurer async - simplifié
   */
  async measureAsync(label, fn) {
    const m = this.start(label);
    try {
      return await fn();
    } finally {
      this.end(m);
    }
  }

  /**
   * Mesurer sync - simplifié
   */
  measureSync(label, fn) {
    const m = this.start(label);
    try {
      return fn();
    } finally {
      this.end(m);
    }
  }

  /**
   * Durée session
   */
  getSessionDuration() {
    const d = performance.now() - this.sessionStart;
    return { ms: d.toFixed(2), ns: (d * 1e6).toFixed(0) };
  }

  /**
   * Toutes les mesures
   */
  getAll() {
    return this.measurements;
  }

  /**
   * Log rapport
   */
  logReport() {
    console.log(this.getReport());
  }
}

// Instance globale
export const globalPerformanceTracker = new AdvancedPerformanceTracker();

export default AdvancedPerformanceTracker;
