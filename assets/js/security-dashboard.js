(function () {
  async function init() {
    const target = document.getElementById("security-core-output");
    if (!target) {
      return;
    }

    try {
      const response = await fetch("/api/security-core", {
        headers: { Accept: "application/json" }
      });
      const payload = await response.json();

      target.innerHTML = `
        <article class="panel">
          <span class="kicker">Dashboard status</span>
          <h2>${payload.name}</h2>
          <p><strong>${payload.status}</strong></p>
          <ul class="list">
            <li>File hash inspection: ${payload.controls.fileHashInspection}</li>
            <li>Entropy analysis: ${payload.controls.entropyAnalysis}</li>
            <li>Known-signature matching: ${payload.controls.knownSignatureMatching}</li>
            <li>Quarantine: ${payload.controls.quarantine}</li>
            <li>Privacy header filtering: ${payload.controls.privacyHeaderFiltering}</li>
            <li>Compliance determination: ${payload.controls.complianceDetermination}</li>
            <li>Kernel I/O interception: ${payload.controls.kernelIoInterception}</li>
            <li>eBPF monitoring: ${payload.controls.ebpfMonitoring}</li>
            <li>Immutable evidence ledger: ${payload.controls.immutableEvidenceLedger}</li>
          </ul>
        </article>
      `;
    } catch (error) {
      target.innerHTML = `<div class="empty-state">Security core status is unavailable in this preview.</div>`;
    }
  }

  init();
})();
