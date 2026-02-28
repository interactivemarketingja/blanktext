const form = document.getElementById('scanForm');
const summary = document.getElementById('scanSummary');
const findingsBody = document.getElementById('findingsBody');
const scoreValue = document.getElementById('scoreValue');
const scoreRing = document.getElementById('scoreRing');

const sampleIssues = [
  { severity: 'critical', issue: 'Outdated OpenSSL dependency detected', status: 'Remediation required' },
  { severity: 'high', issue: 'Missing Content-Security-Policy header', status: 'Policy update pending' },
  { severity: 'medium', issue: 'Admin portal exposed to public internet', status: 'Geo-fencing recommended' },
  { severity: 'low', issue: 'Cookie SameSite not set for analytics endpoint', status: 'Can be hardened' }
];

function severityClass(sev) {
  return `sev-${sev}`;
}

function renderFindings(selectedChecks) {
  const rows = sampleIssues
    .filter((_, idx) => idx < selectedChecks.length + 1)
    .map(({ severity, issue, status }) => `
      <tr>
        <td class="${severityClass(severity)}">${severity.toUpperCase()}</td>
        <td>${issue}</td>
        <td>${status}</td>
      </tr>
    `)
    .join('');

  findingsBody.innerHTML = rows;
}

function renderSummary(url, checks) {
  const score = Math.max(52, 92 - checks.length * 7 - Math.floor(Math.random() * 8));
  scoreValue.textContent = score;
  scoreRing.style.borderColor = score > 80 ? '#28c76f' : score > 65 ? '#ff9f43' : '#ff5d73';

  summary.innerHTML = `
    <li>Target: ${url}</li>
    <li>Checks completed: ${checks.length}</li>
    <li>Last assessment: ${new Date().toLocaleString()}</li>
  `;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const url = document.getElementById('targetUrl').value;
  const checks = [...form.querySelectorAll('input[type="checkbox"]:checked')].map((item) => item.value);

  if (!checks.length) {
    alert('Select at least one security check.');
    return;
  }

  renderSummary(url, checks);
  renderFindings(checks);
});

document.getElementById('runQuickAudit').addEventListener('click', () => {
  document.getElementById('targetUrl').value = 'https://corp.example.com';
  form.requestSubmit();
});
