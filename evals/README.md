# Evals: proving the skills work

A skill change is a guess until it moves these numbers. Run the evals before and after every non-trivial change, and compare against a **baseline without the skill**.

## What's here

| Layer | What it proves | How to run |
|---|---|---|
| **Linter regression** | `brand-check.mjs` flags what it should and nothing else | `node --test skills/awwwards-web-design/scripts/tests/brand-check.test.mjs` |
| **Seeded-defect fixture** | `inspect.sh` measures the planted defects | `bash skills/awwwards-web-design/scripts/inspect.sh skills/design-consulting/evals/files/slop-site/index.html --out .tmp/fixture --name fixture`; expect FAIL on `headline-lines`, `contrast`, `overflow`, `hidden-after-scroll`, `no-js`, `reduced-motion`, `zoom-disabled`, `broken-image` |
| **Behaviour evals** | The agent follows the procedure and the output clears the bar | `skills/*/evals/evals.json` (skill-creator format) |

## Running behaviour evals

Use Anthropic's `skill-creator` skill, which runs each eval with and without the skill, grades the expectations, and opens a review viewer:

```
/skill-creator run the evals for skills/awwwards-web-design and compare against a no-skill baseline
```

Or by hand:
1. For each eval, start a fresh Claude Code session in an empty folder (copy any `files` into it).
2. Run the prompt twice: once with the skill installed, once without.
3. Grade each expectation as pass/fail, using the artifacts (`design/*.md`, `inspect.sh` output, screenshots), not the agent's own report.
4. Record results in `evals/results/<date>-<skill>.md`: pass rate per eval, with and without the skill, and the screenshots of both runs side by side.

## Rules

- **Grade artifacts, not claims.** An expectation passes only if the file, measurement or screenshot shows it.
- **Blind pairwise.** For visual quality, show a reviewer the two first-screen screenshots (with/without the skill) unlabelled and ask which is better and why. The fresh-context critic prompt in `critique.md` §1 works as the reviewer.
- **Repeat.** Run each eval 3 times; agents vary. Report the median.
- **A new false positive or a missed defect becomes a test.** Add it to `brand-check.test.mjs` or plant it in the fixture.
- **Delete what doesn't move the numbers.** If removing a phase or a reference doesn't lower the pass rate, it was weight, not value.
