(() => {
  'use strict';

  const views = [...document.querySelectorAll('[data-view-panel]')];
  const navItems = [...document.querySelectorAll('.demo-nav-item')];
  const title = document.getElementById('topbarTitle');
  const eyebrow = document.getElementById('topbarEyebrow');
  const sidebar = document.getElementById('demoSidebar');
  const modal = document.getElementById('detailModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalLabel = document.getElementById('modalLabel');
  const modalBody = document.getElementById('modalBody');
  const viewMeta = {
    overview: ['Enterprise Application Showcase', 'PORTFOLIO DEMO CENTER'],
    production: ['Production Intelligence Dashboard', 'MANUFACTURING SYSTEM DEMO'],
    sapclone: ['SAP Clone Monitor', 'ENTERPRISE DATA PLATFORM DEMO'],
    hris: ['Integrated HRIS', 'PEOPLE OPERATIONS DEMO'],
    whatsapp: ['WhatsApp Gateway Control Center', 'MESSAGING INFRASTRUCTURE DEMO'],
    purchase: ['Purchase & Finance Analytics', 'PROCUREMENT SYSTEM DEMO']
  };

  function setView(name, updateUrl = true) {
    if (!viewMeta[name]) name = 'overview';
    views.forEach((panel) => panel.classList.toggle('active', panel.dataset.viewPanel === name));
    navItems.forEach((item) => item.classList.toggle('active', item.dataset.view === name));
    title.textContent = viewMeta[name][0];
    eyebrow.textContent = viewMeta[name][1];
    sidebar.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (name === 'overview') url.searchParams.delete('app');
      else url.searchParams.set('app', name);
      history.replaceState({}, '', url);
    }
  }

  navItems.forEach((item) => item.addEventListener('click', () => setView(item.dataset.view)));
  document.querySelectorAll('[data-open-view]').forEach((el) => el.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    setView(el.dataset.openView);
  }));
  document.getElementById('menuToggle').addEventListener('click', () => sidebar.classList.toggle('open'));

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('robbi-demo-theme'); } catch (error) { savedTheme = null; }
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('robbi-demo-theme', next); } catch (error) { /* storage may be unavailable in local previews */ }
  });

  function toast(message, detail = 'This action is simulated in the static demo.') {
    const wrap = document.getElementById('toastContainer');
    const item = document.createElement('div');
    item.className = 'demo-toast';
    item.innerHTML = `<i class="bi bi-check-circle"></i><div><strong>${escapeHtml(message)}</strong><span>${escapeHtml(detail)}</span></div>`;
    wrap.appendChild(item);
    setTimeout(() => item.remove(), 4200);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function showModal(label, heading, bodyHtml) {
    modalLabel.textContent = label;
    modalTitle.textContent = heading;
    modalBody.innerHTML = bodyHtml;
    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
  }
  document.querySelector('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close();
  });

  function filterRows(inputId, tbodyId) {
    const input = document.getElementById(inputId);
    const body = document.getElementById(tbodyId);
    if (!input || !body) return;
    input.addEventListener('input', () => {
      const term = input.value.trim().toLowerCase();
      [...body.rows].forEach((row) => { row.hidden = term && !row.textContent.toLowerCase().includes(term); });
    });
  }
  filterRows('productionSearch', 'productionRows');
  filterRows('cloneSearch', 'cloneRows');
  filterRows('hrisSearch', 'hrisRows');
  filterRows('waSearch', 'waRows');
  filterRows('purchaseSearch', 'purchaseRows');

  const productionProfiles = {
    all: { output: '2,486.7 t', yield: '92.4%', oee: '87.8%', waste: '76.3 t', actual: [61, 74, 82, 89], target: [66, 70, 76, 81] },
    '01': { output: '864.2 t', yield: '93.1%', oee: '89.4%', waste: '22.8 t', actual: [58, 72, 86, 92], target: [62, 69, 78, 84] },
    '02': { output: '742.8 t', yield: '91.7%', oee: '85.9%', waste: '27.4 t', actual: [63, 69, 76, 84], target: [68, 72, 77, 82] },
    '05': { output: '879.7 t', yield: '92.6%', oee: '88.1%', waste: '26.1 t', actual: [66, 77, 84, 91], target: [69, 73, 78, 83] }
  };
  document.getElementById('productionLine').addEventListener('change', (event) => {
    const profile = productionProfiles[event.target.value];
    document.getElementById('metricOutput').textContent = profile.output;
    document.getElementById('metricYield').textContent = profile.yield;
    document.getElementById('metricOee').textContent = profile.oee;
    document.getElementById('metricWaste').textContent = profile.waste;
    document.querySelectorAll('#productionChart .bar-group').forEach((group, index) => {
      group.querySelector('.actual').style.height = `${profile.actual[index]}%`;
      group.querySelector('.target').style.height = `${profile.target[index]}%`;
    });
    [...document.getElementById('productionRows').rows].forEach((row) => {
      row.hidden = event.target.value !== 'all' && !row.textContent.includes(` ${event.target.value} `) && row.cells[1].textContent.trim() !== event.target.value;
    });
    toast(`Production line ${event.target.value === 'all' ? 'filter cleared' : event.target.value + ' selected'}`, 'Dashboard metrics were recalculated from demo data.');
  });

  document.getElementById('productionSync').addEventListener('click', function () {
    const button = this;
    button.disabled = true;
    button.innerHTML = '<i class="bi bi-arrow-repeat"></i> Syncing…';
    document.getElementById('productionUpdated').textContent = 'Queue job running…';
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = '<i class="bi bi-arrow-repeat"></i> Sync SAP';
      document.getElementById('productionUpdated').textContent = 'Updated just now';
      toast('SAP production data synchronized', '10,284 fictional records processed successfully.');
    }, 1500);
  });
  document.getElementById('exportProduction').addEventListener('click', () => toast('Production report prepared', 'The production-report-demo.csv download is simulated.'));
  document.querySelectorAll('[data-order]').forEach((button) => button.addEventListener('click', () => {
    const order = button.dataset.order;
    showModal('PRODUCTION ORDER', order, `
      <div class="modal-kpis"><div><small>Actual output</small><strong>129.8 t</strong></div><div><small>Yield</small><strong>94.7%</strong></div><div><small>OEE</small><strong>89.3%</strong></div></div>
      <div class="detail-grid"><div class="detail-block"><small>Material</small><strong>Spunbond SSS 20 GSM</strong></div><div class="detail-block"><small>Production line</small><strong>Line 01</strong></div><div class="detail-block"><small>Runtime</small><strong>21h 42m</strong></div><div class="detail-block"><small>Total time</small><strong>23h 18m</strong></div><div class="detail-block"><small>Main extruder</small><strong>136.4 t</strong></div><div class="detail-block"><small>Waste</small><strong>7.2 t</strong></div></div>
      <div class="modal-actions"><button class="secondary-btn" onclick="document.getElementById('detailModal').close()">Close</button><button class="primary-btn" onclick="window.demoToast('Detailed breakdown opened','Waste, runtime, jumbo and roll-FM data are simulated.')">View breakdown</button></div>`);
  }));

  let cloneTimer = null;
  let clonePercent = 68;
  function updateClone(value) {
    clonePercent = Math.max(0, Math.min(100, value));
    document.getElementById('clonePercent').textContent = `${clonePercent}%`;
    document.getElementById('cloneProgressBar').style.width = `${clonePercent}%`;
    document.getElementById('cloneHeartbeat').textContent = 'Heartbeat just now';
  }
  function runClone() {
    clearInterval(cloneTimer);
    cloneTimer = setInterval(() => {
      if (clonePercent >= 100) {
        clearInterval(cloneTimer);
        document.getElementById('cloneRunTitle').textContent = 'MATDOC synchronization completed';
        toast('SAP clone completed', '208 pages and 264,118 fictional records were synchronized.');
        return;
      }
      updateClone(clonePercent + 1);
    }, 260);
  }
  document.getElementById('startClone').addEventListener('click', () => {
    updateClone(7);
    document.getElementById('cloneRunTitle').textContent = 'EKKO incremental sync';
    runClone();
    toast('New clone job dispatched', 'Queue workers started processing the EKKO source.');
  });
  document.getElementById('pauseClone').addEventListener('click', function () {
    if (cloneTimer) {
      clearInterval(cloneTimer); cloneTimer = null;
      this.innerHTML = '<i class="bi bi-play"></i> Resume simulation';
      toast('Clone simulation paused', 'Checkpoint state has been preserved.');
    } else {
      runClone();
      this.innerHTML = '<i class="bi bi-pause"></i> Pause simulation';
      toast('Clone simulation resumed', 'Processing continues from the saved checkpoint.');
    }
  });
  document.getElementById('cancelClone').addEventListener('click', () => {
    clearInterval(cloneTimer); cloneTimer = null; updateClone(0);
    document.getElementById('cloneRunTitle').textContent = 'No active cloning job';
    toast('Clone job cancelled', 'The cancellation is simulated; no data was changed.');
  });
  document.getElementById('recheckStuck').addEventListener('click', () => toast('Queue health check completed', 'No stale heartbeat or stuck worker was detected.'));
  document.getElementById('refreshSources').addEventListener('click', () => toast('Source configuration refreshed', 'Five active SAP source definitions were loaded.'));
  document.getElementById('openDataBrowser').addEventListener('click', () => showModal('SAP DATA BROWSER', 'MATDOC sample records', `
    <div class="detail-grid"><div class="detail-block"><small>Document</small><strong>4900128841</strong></div><div class="detail-block"><small>Material</small><strong>DEMO-MAT-001</strong></div><div class="detail-block"><small>Plant</small><strong>1100</strong></div><div class="detail-block"><small>Posting date</small><strong>15 Jul 2026</strong></div><div class="detail-block"><small>Movement type</small><strong>101</strong></div><div class="detail-block"><small>Quantity</small><strong>24,000 KG</strong></div></div>
    <p style="color:var(--muted);font-size:11px;margin-top:15px">This data browser demonstrates configurable SAP field mapping and local-table exploration using fictional records.</p>`));
  document.querySelectorAll('[data-log]').forEach((button) => button.addEventListener('click', () => showModal('CLONE LOG', `${button.dataset.log} execution log`, `
    <div class="detail-block"><small>17:42:18</small><strong>Heartbeat received from worker sap-clone-03.</strong></div><div class="detail-block" style="margin-top:8px"><small>17:42:16</small><strong>Upserted chunk 7/10 — 1,000 records.</strong></div><div class="detail-block" style="margin-top:8px"><small>17:42:14</small><strong>Fetched SAP page 142/208 in 1.08 seconds.</strong></div><div class="detail-block" style="margin-top:8px"><small>17:42:12</small><strong>Checkpoint persisted successfully.</strong></div>`)));

  const roleTitles = { hrd: 'HR approval queue', manager: 'Department approval queue', employee: 'My requests' };
  document.getElementById('hrisRole').addEventListener('change', (event) => {
    document.getElementById('hrisTableTitle').textContent = roleTitles[event.target.value];
    toast(`Role changed to ${event.target.options[event.target.selectedIndex].text}`, 'Permissions and visible actions were adapted for the demo role.');
  });
  document.getElementById('newLeave').addEventListener('click', () => showModal('NEW REQUEST', 'Submit annual leave', `
    <div class="detail-grid"><label class="detail-block"><small>Start date</small><input id="leaveStart" type="date" value="2026-07-24" style="width:100%;margin-top:7px;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></label><label class="detail-block"><small>End date</small><input id="leaveEnd" type="date" value="2026-07-25" style="width:100%;margin-top:7px;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></label><label class="detail-block" style="grid-column:1/-1"><small>Reason</small><input id="leaveReason" value="Family event" style="width:100%;margin-top:7px;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--text)"></label></div>
    <div class="modal-actions"><button class="secondary-btn" onclick="document.getElementById('detailModal').close()">Cancel</button><button class="primary-btn" onclick="window.submitDemoLeave()">Submit request</button></div>`));
  window.submitDemoLeave = () => {
    modal.close();
    const row = document.getElementById('hrisRows').insertRow(0);
    row.dataset.status = 'pending';
    row.innerHTML = '<td><strong>LV-2026-0715-041</strong><small>Submitted just now</small></td><td><strong>Demo Employee</strong><small>EMP-0001</small></td><td>Information Technology</td><td>Annual leave</td><td>24–25 Jul · 2 days</td><td><div class="route-inline"><i class="active"></i><i></i><i></i></div></td><td><span class="status warning">Waiting head</span></td><td><button class="row-action"><i class="bi bi-chevron-right"></i></button></td>';
    document.getElementById('pendingApprovals').textContent = '13';
    toast('Leave request submitted', 'The approval workflow was started with fictional data.');
  };
  document.querySelectorAll('.hris-action').forEach((button) => button.addEventListener('click', () => {
    const request = button.dataset.request;
    showModal('HRIS REQUEST', request, `
      <div class="modal-kpis"><div><small>Leave balance</small><strong>8 days</strong></div><div><small>Requested</small><strong>2 days</strong></div><div><small>Team coverage</small><strong>92%</strong></div></div>
      <div class="detail-grid"><div class="detail-block"><small>Employee</small><strong>Dina Pratama · EMP-1042</strong></div><div class="detail-block"><small>Department</small><strong>Production Planning</strong></div><div class="detail-block"><small>Period</small><strong>18–19 July 2026</strong></div><div class="detail-block"><small>Reason</small><strong>Family event</strong></div></div>
      <div class="modal-actions"><button class="danger-btn" onclick="window.processHris('${request}','Rejected')"><i class="bi bi-x-lg"></i> Reject</button><button class="primary-btn" onclick="window.processHris('${request}','Approved')"><i class="bi bi-check2"></i> Approve</button></div>`);
  }));
  window.processHris = (request, status) => {
    modal.close();
    [...document.getElementById('hrisRows').rows].forEach((row) => {
      if (row.textContent.includes(request)) {
        row.cells[6].innerHTML = `<span class="status ${status === 'Approved' ? 'success' : 'danger'}">${status}</span>`;
      }
    });
    toast(`Request ${status.toLowerCase()}`, 'The approval action was applied to demo data only.');
  };
  document.getElementById('refreshHris').addEventListener('click', () => toast('HRIS dashboard refreshed', 'Latest attendance and approval summaries were loaded.'));
  document.getElementById('hrisCalendar').addEventListener('click', () => showModal('TEAM CALENDAR', 'July 2026 availability', '<div class="detail-grid"><div class="detail-block"><small>18 July</small><strong>2 employees on leave</strong></div><div class="detail-block"><small>19 July</small><strong>2 employees on leave</strong></div><div class="detail-block"><small>21 July</small><strong>1 business trip</strong></div><div class="detail-block"><small>24 July</small><strong>3 planned leaves</strong></div></div>'));

  document.getElementById('waMessageForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const destination = document.getElementById('waDestination').value;
    const instance = document.getElementById('waInstance').value;
    const message = document.getElementById('waMessage').value;
    if (!destination.trim() || !message.trim()) return;
    const row = document.getElementById('waRows').insertRow(0);
    row.innerHTML = `<td>Just now</td><td><strong>${escapeHtml(instance.toLowerCase().split(' ')[0])}</strong></td><td>Outbound message</td><td>${escapeHtml(destination.replace(/(\d{4})\d+(\d{4})/, '$1••••$2'))}</td><td><span class="status warning">Queued</span></td><td>—</td><td>Static demo simulation</td>`;
    const count = Number(document.getElementById('messagesToday').textContent.replace(/,/g, '')) + 1;
    document.getElementById('messagesToday').textContent = count.toLocaleString('en-US');
    toast('Demo message queued', 'No message was sent to WhatsApp or an external API.');
    setTimeout(() => { row.cells[4].innerHTML = '<span class="status success">Delivered</span>'; row.cells[5].textContent = '816 ms'; }, 1300);
  });
  document.getElementById('refreshWa').addEventListener('click', () => toast('Gateway status refreshed', 'All three simulated sessions are connected.'));
  document.getElementById('clearWaLogs').addEventListener('click', () => { document.getElementById('waRows').innerHTML = ''; toast('Demo logs cleared', 'Only the local browser view was changed.'); });
  document.getElementById('waAddInstance').addEventListener('click', () => showModal('ADD INSTANCE', 'Connect a WhatsApp number', '<div class="detail-block"><small>Connection method</small><strong>QR code or pairing number</strong></div><div style="height:210px;display:grid;place-items:center;margin-top:12px;border:1px dashed var(--line);border-radius:14px;background:var(--surface-2)"><div style="text-align:center"><i class="bi bi-qr-code" style="font-size:72px;color:var(--brand)"></i><p style="color:var(--muted);font-size:10px">QR is intentionally simulated</p></div></div>'));
  document.getElementById('waApiClient').addEventListener('click', () => showModal('API CLIENT', 'Portfolio Demo Client', '<div class="detail-grid"><div class="detail-block"><small>Client name</small><strong>portfolio-demo</strong></div><div class="detail-block"><small>Status</small><strong style="color:var(--brand)">Active</strong></div><div class="detail-block"><small>API key</small><strong>gw_demo_••••••••••7R2K</strong></div><div class="detail-block"><small>Rate limit</small><strong>60 requests/minute</strong></div><div class="detail-block"><small>Allowed IP</small><strong>Demo environment only</strong></div><div class="detail-block"><small>Last used</small><strong>2 minutes ago</strong></div></div>'));

  const purchaseProfiles = {
    all: ['Rp 42.8B', '186', '91.6%', '74'],
    ZRAW: ['Rp 26.1B', '74', '93.2%', '28'],
    ZSUP: ['Rp 9.8B', '68', '88.7%', '31'],
    ZPCK: ['Rp 6.9B', '44', '92.1%', '15']
  };
  document.getElementById('purchaseType').addEventListener('change', (event) => {
    const values = purchaseProfiles[event.target.value];
    ['purchaseCommitment','purchaseOpen','purchaseGr','purchaseVendors'].forEach((id,index) => document.getElementById(id).textContent = values[index]);
    toast('Material type filter applied', 'Purchase summaries were recalculated from fictional data.');
  });
  document.getElementById('purchaseSync').addEventListener('click', function () {
    this.disabled = true; this.innerHTML = '<i class="bi bi-arrow-repeat"></i> Syncing…';
    setTimeout(() => { this.disabled = false; this.innerHTML = '<i class="bi bi-arrow-repeat"></i> Sync report'; toast('Purchase report synchronized', 'PO, GR, stock, and price demo datasets are up to date.'); }, 1400);
  });
  document.getElementById('refreshPurchaseChart').addEventListener('click', () => toast('Spend composition refreshed', 'Material type proportions were recalculated.'));
  document.getElementById('poSwitch').addEventListener('click', () => showModal('PO SWITCH ACCOUNT', 'Transaction list', '<div class="detail-grid"><div class="detail-block"><small>PO</small><strong>5100038421</strong></div><div class="detail-block"><small>FI document</small><strong>1900047832 / 2026</strong></div><div class="detail-block"><small>Credit account</small><strong>211100 · GR/IR Clearing</strong></div><div class="detail-block"><small>Debit account</small><strong>115210 · Raw Material Inventory</strong></div><div class="detail-block"><small>Amount</small><strong>Rp 384,000,000</strong></div><div class="detail-block"><small>Posting date</small><strong>15 July 2026</strong></div></div>'));
  document.querySelectorAll('.purchase-action').forEach((button) => button.addEventListener('click', () => showModal('PURCHASE ORDER', button.dataset.po, '<div class="modal-kpis"><div><small>PO value</small><strong>Rp 4.32B</strong></div><div><small>GR completion</small><strong>90%</strong></div><div><small>Remaining</small><strong>24,000 kg</strong></div></div><div class="detail-grid"><div class="detail-block"><small>Vendor</small><strong>PT Demo Polymer Indonesia</strong></div><div class="detail-block"><small>Material</small><strong>Polypropylene Resin A</strong></div><div class="detail-block"><small>Delivery date</small><strong>18 July 2026</strong></div><div class="detail-block"><small>Last GR</small><strong>15 July 2026</strong></div></div>')));

  window.demoToast = toast;
  const initial = new URLSearchParams(window.location.search).get('app') || 'overview';
  setView(initial, false);
})();
