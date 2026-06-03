# Public publication note

This repository is a sanitized public export of the digital-org orchestration
kit. Local paths, private Linear live fixtures, raw Paperclip readback JSON, and
project-specific runtime references were removed or replaced with examples
before publication.

The default workflow is now Paperclip-native: Paperclip owns the control plane
and Codex is a runtime provider. The older Codex-thread workflow remains as a
fallback pattern for projects without Paperclip.
