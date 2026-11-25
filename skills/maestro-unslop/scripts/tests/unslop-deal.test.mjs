import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { dealDirection } from '../unslop-deal.mjs';

describe('unslop-deal.mjs', () => {
  it('is deterministic for identical kind + brief + seed', () => {
    const a = dealDirection({ kind: 'place', brief: 'roastery in Bandung', seed: 3 });
    const b = dealDirection({ kind: 'place', brief: 'roastery in Bandung', seed: 3 });
    assert.deepEqual(a, b);
    assert.equal(a.tier, 'non-tech');
    assert.equal(a.surface, 'persuade');
    assert.equal(a.moments.length, 2);
  });

  it('keeps shaders/UI moments strictly off non-tech kinds', () => {
    for (const kind of ['place', 'product', 'service']) {
      for (let seed = 1; seed <= 5; seed++) {
        const res = dealDirection({ kind, brief: `sample ${kind}`, seed });
        assert.equal(res.tier, 'non-tech');
        assert.ok(!res.moments.includes('ambient-canvas'), `${kind} should never get ambient-canvas`);
        assert.ok(!res.moments.includes('pulse-diagram'), `${kind} should never get pulse-diagram`);
        assert.ok(!res.moments.includes('live-ui-frame'), `${kind} should never get live-ui-frame`);
      }
    }
  });

  it('respects keep palette,type options', () => {
    const res = dealDirection({ kind: 'software', brief: 'SQL diff tool', keep: ['palette', 'type'] });
    assert.equal(res.tier, 'tech');
    assert.equal(typeof res.palette, 'string');
    assert.equal(typeof res.fonts, 'string');
  });

  it('throws on invalid kind or missing brief', () => {
    assert.throws(() => dealDirection({ kind: 'invalid', brief: 'x' }));
    assert.throws(() => dealDirection({ kind: 'place', brief: '' }));
  });
});
