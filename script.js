let currentRole = 'student';
let currentUser = { name: 'Bhavagna Reddy', id: 'STU2024001', role: 'student' };
let selectedClaimItem = null;

const items = [
  { id:'ITM001', type:'found', name:'Black Dell Laptop', category:'Electronics', location:'Library – 2nd Floor', date:'2024-01-19', desc:'15 inch Dell Inspiron, black, slight scratch on lid. Found near study table.', uid:'SN: 9XKF2810', status:'open', reportedBy:'Hari Kumar', photo:'💻', proofScore:85, quizAnswers:['black','Dell Inspiron','scratch on lid','Library'] },
  { id:'ITM002', type:'found', name:'Green Spiral Notebook', category:'Books / Stationery', location:'Canteen – B Floor', date:'2024-01-18', desc:'A5 green spiral notebook, handwritten name inside cover.', uid:'Name: Priya inside', status:'pending', reportedBy:'Priya Sharma', photo:'📒', proofScore:70, quizAnswers:['green','A5','spiral','Canteen'] },
  { id:'ITM003', type:'lost', name:'Silver AirPods Case', category:'Electronics', location:'Boys Common Room – B Floor', date:'2024-01-20', desc:'AirPods Pro silver case, has a small dent. Left near seating area.', uid:'Case scratched near hinge', status:'open', reportedBy:'Aarav Mehta', photo:'🎧', proofScore:60, quizAnswers:['silver','AirPods Pro','dent','Common Room'] },
  { id:'ITM004', type:'lost', name:'Blue Backpack', category:'Bag / Wallet', location:'Room 101 – 1st Floor', date:'2024-01-21', desc:'Navy blue Wildcraft backpack with white logo. Contains textbooks.', uid:'Yellow keychain attached', status:'verified', reportedBy:'Divya Nair', photo:'🎒', proofScore:90, quizAnswers:['navy blue','Wildcraft','yellow keychain','Room 101'] },
  { id:'ITM005', type:'found', name:'Student ID Card', category:'ID / Documents', location:'Faculty Room – Ground Floor', date:'2024-01-22', desc:'Student ID card found near faculty room entrance.', uid:'Name on card: Rohit Verma', status:'claimed', reportedBy:'Admin Staff', photo:'🪪', proofScore:100, quizAnswers:['Rohit','faculty room','ground floor','ID card'] },
  { id:'ITM006', type:'lost', name:'Canon Camera', category:'Electronics', location:'Auditorium – 3rd Floor', date:'2024-01-17', desc:'Canon EOS M50 black camera with kit lens. Left on seat 3B during event.', uid:'SN: CE49201, has lens cap', status:'open', reportedBy:'Tanvi Shah', photo:'📷', proofScore:75, quizAnswers:['Canon','EOS M50','seat 3B','Auditorium'] },
  { id:'ITM007', type:'found', name:'Gold Ring', category:'Accessories / Jewelry', location:'Library – 2nd Floor', date:'2024-01-23', desc:'Small gold ring with floral engraving, found near window seats.', uid:'Engraving: floral pattern', status:'pending', reportedBy:'Security Staff', photo:'💍', proofScore:80, quizAnswers:['gold','floral','engraving','Library'] },
  { id:'ITM008', type:'lost', name:'Red Wireless Mouse', category:'Electronics', location:'Lab 008 – Ground Floor', date:'2024-01-20', desc:'Logitech M280 red wireless mouse. Lost in computer lab.', uid:'Sticker on bottom: LAB-008', status:'open', reportedBy:'Aarav Mehta', photo:'🖱️', proofScore:65, quizAnswers:['red','Logitech','M280','Lab 008'] },
];

const myReports = ['ITM003','ITM008'];

const claimsQueue = [
  { claimant:'Ashmitha', item:'ITM001', sid:'STU2024089', idVerified:true, quizScore:3, photoMatch:true, submitted:'2024-01-20' },
  { claimant:'Lahari', item:'ITM002', sid:'STU2024042', idVerified:true, quizScore:2, photoMatch:false, submitted:'2024-01-19' },
  { claimant:'Anirudh', item:'ITM007', sid:'STU2024111', idVerified:false, quizScore:4, photoMatch:true, submitted:'2024-01-23' },
];

const USERS = {
  student: [
    { id:'STU2024001', password:'student123', name:'Bhavagna Reddy' },
    { id:'STU2024002', password:'pass2024', name:'Ashmitha' },
    { id:'STU2024003', password:'klu@123', name:'Lily' },
  ],
  admin: [
    { id:'SEC001', password:'security@klu', name:'Sai' },
    { id:'SEC002', password:'admin2024', name:'Bhavagna' },
  ],
  authority: [
    { id:'AUTH001', password:'authority@klu', name:'Prof Bhavagna' },
    { id:'AUTH002', password:'dean2024', name:'Dr Koteshwar Rao' },
  ],
};

function setRole(role, btn) {
  currentRole = role;
  document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  clearLoginError();
}

function clearLoginError() {
  const err = document.getElementById('login-error');
  if (err) err.style.display = 'none';
}

function showLoginError(msg) {
  let err = document.getElementById('login-error');
  if (!err) {
    err = document.createElement('div');
    err.id = 'login-error';
    err.style.cssText = 'background:#FFEBEE;color:#B71C1C;border:1px solid #FFCDD2;border-radius:8px;padding:10px 13px;font-size:13px;font-weight:600;margin-top:10px;display:flex;align-items:center;gap:8px;';
    document.querySelector('.btn-login').after(err);
  }
  err.innerHTML = '❌ ' + msg;
  err.style.display = 'flex';
}

function doLogin() {
  const id = document.getElementById('login-id').value.trim();
  const password = document.getElementById('login-pass').value.trim();
  if (!id || !password) { showLoginError('Please enter your ID and password.'); return; }
  const pool = USERS[currentRole] || [];
  const match = pool.find(u => u.id === id && u.password === password);
  if (!match) {
    showLoginError('Invalid ID or password. Please try again.');
    document.getElementById('login-pass').value = '';
    return;
  }
  currentUser = { name: match.name, id: match.id, role: currentRole };
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  clearLoginError();
  initApp();
}

function logout() {
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('login-id').value = '';
  document.getElementById('login-pass').value = '';
  clearLoginError();
}

function initApp() {
  const colors = { student:'#C41230', admin:'#10b981', authority:'#f97316' };
  document.getElementById('sb-avatar').textContent = currentUser.name[0];
  document.getElementById('sb-avatar').style.background = colors[currentRole];
  document.getElementById('sb-name').textContent = currentUser.name;
  document.getElementById('sb-role').textContent = ({ student:'Student', admin:'Security Staff', authority:'Campus Authority' })[currentRole];
  document.getElementById('dash-greeting').textContent = 'Welcome, ' + currentUser.name.split(' ')[0] + '! 👋';
  buildNav();
  renderDashboard();
  renderSearch();
  renderMyReports();
  renderAdminVerify();
  renderMatches();
  document.getElementById('r-date').valueAsDate = new Date();
}

const navConfigs = {
  student: [
    { icon:'🏠', label:'Dashboard', page:'page-dashboard' },
    { icon:'📋', label:'Report Item', page:'page-report' },
    { icon:'🔍', label:'Search Items', page:'page-search' },
    { icon:'📁', label:'My Reports', page:'page-my-reports' },
    { icon:'🔗', label:'Matches', page:'page-matches' },
    { icon:'🎫', label:'Claim Item', page:'page-claim' },
  ],
  admin: [
    { icon:'🏠', label:'Dashboard', page:'page-dashboard' },
    { icon:'✅', label:'Verify Claims', page:'page-verify', badge:'3' },
    { icon:'🔍', label:'Browse Items', page:'page-search' },
    { icon:'🔗', label:'Matches', page:'page-matches' },
    { icon:'📋', label:'Add Report', page:'page-report' },
  ],
  authority: [
    { icon:'🏠', label:'Dashboard', page:'page-dashboard' },
    { icon:'🏛️', label:'Approve Claims', page:'page-verify', badge:'2' },
    { icon:'📊', label:'All Items', page:'page-search' },
    { icon:'🔗', label:'Matches', page:'page-matches' },
  ],
};

function buildNav() {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';
  navConfigs[currentRole].forEach(item => {
    nav.innerHTML += '<div class="nav-item ' + (item.page === 'page-dashboard' ? 'active' : '') + '" onclick="showPage(\'' + item.page + '\',this)">' +
      '<span class="nav-icon">' + item.icon + '</span> ' + item.label +
      (item.badge ? ' <span class="nav-badge">' + item.badge + '</span>' : '') +
      '</div>';
  });
}

function showPage(pageId, navEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (navEl) {
    navEl.classList.add('active');
  } else {
    document.querySelectorAll('.nav-item').forEach(n => {
      if (n.getAttribute('onclick') && n.getAttribute('onclick').includes(pageId)) n.classList.add('active');
    });
  }
}

function calcProofScore(c) {
  let score = 0;
  if (c.idVerified) score += 40;
  score += (c.quizScore / 4) * 40;
  if (c.photoMatch) score += 20;
  return Math.round(score);
}

function renderDashboard() {
  document.getElementById('stat-lost').textContent = items.filter(i => i.type === 'lost').length;
  document.getElementById('stat-found').textContent = items.filter(i => i.type === 'found').length;
  document.getElementById('stat-pending').textContent = items.filter(i => i.status === 'pending').length;

  document.getElementById('recent-list').innerHTML = items.slice(0,5).map(it =>
    '<div class="item-row" onclick="openItemModal(\'' + it.id + '\')">' +
    '<div style="font-size:24px;width:40px;text-align:center">' + it.photo + '</div>' +
    '<div style="flex:1"><div style="font-size:13px;font-weight:600">' + it.name + '</div>' +
    '<div style="font-size:12px;color:var(--text3)">' + it.location + '</div></div>' +
    '<span class="badge-status ' + it.status + '">' + it.status + '</span></div>'
  ).join('');

  document.getElementById('mini-chart').innerHTML = [35,60,45,80,50,90,70].map(h =>
    '<div class="bar-col" style="height:' + h + '%"></div>'
  ).join('');

  document.getElementById('activity-timeline').innerHTML = [
    { icon:'🔗', text:'Match found: Black Laptop matched with a claim', time:'2h ago' },
    { icon:'📋', text:'New claim submitted: Green Notebook', time:'4h ago' },
    { icon:'✅', text:'Claim approved: Student ID Card returned', time:'Yesterday' },
  ].map(a =>
    '<div class="tl-item"><div class="tl-dot done">' + a.icon + '</div>' +
    '<div class="tl-content"><h4>' + a.text + '</h4><p>' + a.time + '</p></div></div>'
  ).join('');

  if (currentRole === 'admin' || currentRole === 'authority') {
    document.getElementById('proof-panel').style.display = 'block';
    document.getElementById('verify-table-body').innerHTML = claimsQueue.map(c => {
      const it = items.find(i => i.id === c.item);
      const total = calcProofScore(c);
      const col = total >= 70 ? '#16A34A' : total >= 40 ? '#D97706' : '#C41230';
      return '<tr><td>' + it.photo + ' ' + it.name + '</td>' +
        '<td><strong>' + c.claimant + '</strong></td>' +
        '<td><span style="font-weight:700;color:' + col + '">' + total + '%</span></td>' +
        '<td>' + c.submitted + '</td>' +
        '<td><button class="btn btn-sm btn-blue" onclick="showPage(\'page-verify\')">Review</button></td></tr>';
    }).join('');
  }
}

function renderSearch() {
  const q = (document.getElementById('search-input') ? document.getElementById('search-input').value : '').toLowerCase();
  const st = document.getElementById('filter-status') ? document.getElementById('filter-status').value : '';
  const tp = document.getElementById('filter-type') ? document.getElementById('filter-type').value : '';
  const filtered = items.filter(i => {
    const mq = !q || i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q) || i.location.toLowerCase().includes(q);
    const ms = !st || i.status === st;
    const mt = !tp || i.type === tp;
    return mq && ms && mt;
  });
  const container = document.getElementById('search-results');
  if (!filtered.length) {
    container.innerHTML = '<div class="empty-state" style="grid-column:span 3"><div class="icon">🔍</div><p>No items found.</p></div>';
    return;
  }
  container.innerHTML = filtered.map(it =>
    '<div class="card" style="cursor:pointer;padding:16px;transition:transform 0.18s,box-shadow 0.18s" onclick="openItemModal(\'' + it.id + '\')" onmouseenter="this.style.transform=\'translateY(-3px)\';this.style.boxShadow=\'0 8px 24px rgba(0,0,0,0.12)\'" onmouseleave="this.style.transform=\'translateY(0)\';this.style.boxShadow=\'\'">' +
    '<div style="font-size:40px;text-align:center;background:var(--surface2);border-radius:12px;padding:16px;margin-bottom:12px">' + it.photo + '</div>' +
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">' +
    '<h3 style="font-size:14px;font-weight:700">' + it.name + '</h3>' +
    '<span class="badge-status ' + it.status + '" style="margin-left:6px;white-space:nowrap">' + it.status + '</span></div>' +
    '<p style="font-size:12px;color:var(--text3);margin-bottom:8px">' + it.desc.substring(0,60) + '...</p>' +
    '<div style="display:flex;justify-content:space-between;align-items:center">' +
    '<span class="tag">' + (it.type === 'lost' ? '📍 Lost' : '📦 Found') + '</span>' +
    '<span style="font-size:11px;color:var(--text3)">' + it.location + '</span></div></div>'
  ).join('');
}

function renderMyReports() {
  const myItems = items.filter(i => myReports.includes(i.id));
  document.getElementById('my-reports-body').innerHTML = myItems.map(it => {
    const col = it.proofScore >= 70 ? '#16A34A' : '#D97706';
    return '<tr>' +
      '<td><span style="font-size:18px;margin-right:8px">' + it.photo + '</span><strong>' + it.name + '</strong></td>' +
      '<td><span class="tag">' + (it.type === 'lost' ? '📍 Lost' : '📦 Found') + '</span></td>' +
      '<td style="color:var(--text3);font-size:12px">' + it.date + '</td>' +
      '<td style="font-size:12px">' + it.location + '</td>' +
      '<td><span class="badge-status ' + it.status + '">' + it.status + '</span></td>' +
      '<td><span style="font-size:12px;font-weight:700;color:' + col + '">' + it.proofScore + '%</span></td>' +
      '<td><button class="btn btn-sm btn-outline" onclick="openItemModal(\'' + it.id + '\')">View</button></td></tr>';
  }).join('');
}

function renderAdminVerify() {
  document.getElementById('admin-verify-body').innerHTML = claimsQueue.map((c, idx) => {
    const it = items.find(i => i.id === c.item);
    const total = calcProofScore(c);
    const col = total >= 70 ? '#16A34A' : total >= 40 ? '#D97706' : '#C41230';
    const qp = Math.round((c.quizScore / 4) * 100);
    return '<tr>' +
      '<td>' + it.photo + ' <strong>' + it.name + '</strong></td>' +
      '<td><strong>' + c.claimant + '</strong><br><span style="font-size:11px;color:var(--text3)">' + c.sid + '</span></td>' +
      '<td><span style="color:' + (c.idVerified ? '#16A34A' : '#C41230') + ';font-weight:700">' + (c.idVerified ? '✅ Yes' : '❌ No') + '</span></td>' +
      '<td>' + c.quizScore + '/4 (' + qp + '%)</td>' +
      '<td><span style="color:' + (c.photoMatch ? '#16A34A' : '#C41230') + ';font-weight:700">' + (c.photoMatch ? '✅ Yes' : '❌ No') + '</span></td>' +
      '<td><span style="font-size:18px;font-weight:800;color:' + col + '">' + total + '%</span></td>' +
      '<td style="display:flex;gap:6px;flex-wrap:wrap">' +
      (total >= 60
        ? '<button class="btn btn-sm btn-green" onclick="approveClaim(' + idx + ')">✅ Approve</button>'
        : '<button class="btn btn-sm btn-red-s" onclick="rejectClaim(' + idx + ')">❌ Reject</button>') +
      '<button class="btn btn-sm btn-outline" onclick="openItemModal(\'' + it.id + '\')">View</button></td></tr>';
  }).join('');
}

function approveClaim(idx) {
  const c = claimsQueue[idx];
  const it = items.find(i => i.id === c.item);
  it.status = 'claimed';
  claimsQueue.splice(idx, 1);
  renderAdminVerify();
  renderSearch();
  alert('✅ Claim approved! ' + c.claimant + ' can collect "' + it.name + '".');
}

function rejectClaim(idx) {
  const c = claimsQueue[idx];
  claimsQueue.splice(idx, 1);
  renderAdminVerify();
  alert('❌ Claim rejected. ' + c.claimant + ' will be notified.');
}

const matchPairs = [
  { lost:'ITM003', found:'ITM001', confidence:92, reason:'Same category, same building, reported within 2 days' },
  { lost:'ITM004', found:'ITM002', confidence:74, reason:'Similar floor, matching category, date proximity' },
  { lost:'ITM006', found:'ITM007', confidence:58, reason:'Same campus building, accessory type overlap' },
];

function renderMatches() {
  document.getElementById('matches-grid').innerHTML = matchPairs.map(m => {
    const lost = items.find(i => i.id === m.lost);
    const found = items.find(i => i.id === m.found);
    const col = m.confidence >= 80 ? '#16A34A' : m.confidence >= 60 ? '#D97706' : '#EA6C00';
    return '<div class="card" style="padding:20px">' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">' +
      '<div style="flex:1;text-align:center;background:#FFEBEE;border-radius:12px;padding:12px">' +
      '<div style="font-size:32px">' + lost.photo + '</div>' +
      '<div style="font-size:12px;font-weight:700;margin-top:4px">' + lost.name + '</div>' +
      '<span class="tag" style="font-size:10px">📍 LOST</span></div>' +
      '<div style="font-size:24px;color:' + col + '">⟷</div>' +
      '<div style="flex:1;text-align:center;background:#E8F5E9;border-radius:12px;padding:12px">' +
      '<div style="font-size:32px">' + found.photo + '</div>' +
      '<div style="font-size:12px;font-weight:700;margin-top:4px">' + found.name + '</div>' +
      '<span class="tag" style="font-size:10px">📦 FOUND</span></div></div>' +
      '<div style="text-align:center;margin-bottom:10px">' +
      '<div style="font-size:28px;font-weight:800;color:' + col + '">' + m.confidence + '%</div>' +
      '<div style="font-size:11px;color:var(--text3)">Match Confidence</div>' +
      '<div class="proof-bar" style="margin-top:6px"><div class="proof-fill" style="width:' + m.confidence + '%;background:' + col + '"></div></div></div>' +
      '<p style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:14px">' + m.reason + '</p>' +
      '<div style="display:flex;gap:8px">' +
      '<button class="btn btn-outline btn-sm" style="flex:1" onclick="openItemModal(\'' + lost.id + '\')">View Lost</button>' +
      '<button class="btn btn-blue btn-sm" style="flex:1" onclick="openItemModal(\'' + found.id + '\')">View Found</button></div></div>';
  }).join('');
}

function openItemModal(id) {
  const it = items.find(i => i.id === id);
  const col = it.proofScore >= 70 ? '#16A34A' : '#D97706';
  document.getElementById('item-modal-content').innerHTML =
    '<div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">' +
    '<div style="font-size:48px;background:var(--surface2);border-radius:16px;padding:16px">' + it.photo + '</div>' +
    '<div><div style="font-size:10px;font-weight:700;color:var(--text3);letter-spacing:1px;text-transform:uppercase">' + it.id + ' · ' + it.category + '</div>' +
    '<h2 style="font-size:22px;font-weight:800;margin:4px 0">' + it.name + '</h2>' +
    '<span class="badge-status ' + it.status + '">' + it.status + '</span>' +
    '<span class="tag" style="margin-left:6px">' + (it.type === 'lost' ? '📍 Lost' : '📦 Found') + '</span></div></div>' +
    '<p style="color:var(--text3);font-size:13px;margin-bottom:16px">' + it.desc + '</p>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">' +
    '<div style="background:var(--surface2);border-radius:10px;padding:12px;border:1px solid var(--border)"><div style="font-size:11px;color:var(--text3);font-weight:700">📍 LOCATION</div><div style="font-size:13px;font-weight:600;margin-top:3px">' + it.location + '</div></div>' +
    '<div style="background:var(--surface2);border-radius:10px;padding:12px;border:1px solid var(--border)"><div style="font-size:11px;color:var(--text3);font-weight:700">📅 DATE</div><div style="font-size:13px;font-weight:600;margin-top:3px">' + it.date + '</div></div>' +
    '<div style="background:var(--surface2);border-radius:10px;padding:12px;border:1px solid var(--border)"><div style="font-size:11px;color:var(--text3);font-weight:700">👤 REPORTED BY</div><div style="font-size:13px;font-weight:600;margin-top:3px">' + it.reportedBy + '</div></div>' +
    '<div style="background:var(--surface2);border-radius:10px;padding:12px;border:1px solid var(--border)"><div style="font-size:11px;color:var(--text3);font-weight:700">🔢 UNIQUE ID</div><div style="font-size:13px;font-weight:600;margin-top:3px">' + (it.uid || 'None') + '</div></div></div>' +
    '<div style="background:var(--surface2);border-radius:10px;padding:12px;border:1px solid var(--border)">' +
    '<div style="font-size:11px;color:var(--text3);font-weight:700;margin-bottom:6px">🔐 PROOF SCORE</div>' +
    '<div style="display:flex;align-items:center;gap:10px">' +
    '<div style="font-size:22px;font-weight:800;color:' + col + '">' + it.proofScore + '%</div>' +
    '<div class="proof-bar" style="flex:1"><div class="proof-fill" style="width:' + it.proofScore + '%;background:' + col + '"></div></div></div></div>';

  const footer = document.getElementById('item-modal-footer');
  footer.innerHTML = '<button class="btn btn-outline" onclick="closeModal(\'item-modal\')">Close</button>';
  if (it.type === 'found' && it.status === 'open' && currentRole === 'student') {
    footer.innerHTML += '<button class="btn btn-red" onclick="closeModal(\'item-modal\');initiateClaim(\'' + it.id + '\')">🔐 Claim This Item</button>';
  }
  selectedClaimItem = it;
  openModal('item-modal');
}

function initiateClaim(id) {
  selectedClaimItem = items.find(i => i.id === id);
  openModal('claim-modal');
}

function startClaim() {
  const sid = document.getElementById('claim-sid').value;
  const name = document.getElementById('claim-name').value;
  if (!sid || !name) { alert('Please fill in all fields.'); return; }
  closeModal('claim-modal');
  setupClaimPage(selectedClaimItem);
  showPage('page-claim');
}

function setupClaimPage(item) {
  document.getElementById('claim-item-detail').innerHTML =
    '<div style="display:flex;gap:12px;align-items:center">' +
    '<div style="font-size:40px;background:var(--surface2);border-radius:12px;padding:12px">' + item.photo + '</div>' +
    '<div><h3 style="font-weight:800">' + item.name + '</h3>' +
    '<p style="font-size:12px;color:var(--text3)">' + item.category + ' · ' + item.location + '</p>' +
    '<span class="badge-status ' + item.status + '">' + item.status + '</span></div></div>' +
    '<p style="margin-top:12px;font-size:13px;color:var(--text3)">' + item.desc + '</p>';

  const hints = [
    { q:'What colour is the item?', options: shuffleWith(item.quizAnswers[0], ['Black','White','Blue','Red','Green','Silver','Gold']), correct: item.quizAnswers[0] },
    { q:'Where exactly was the item last seen?', options: shuffleWith(item.quizAnswers[3], ['Library','Canteen','Auditorium','Common Room','Lab','Faculty Room']), correct: item.quizAnswers[3] },
    { q:'Describe a unique feature of the item:', options: shuffleWith(item.quizAnswers[2], ['Sticker on back','Yellow keychain','Engraving','Dent','Scratch','Stain']), correct: item.quizAnswers[2] },
    { q:'What is the brand or type?', options: shuffleWith(item.quizAnswers[1], ['Dell','Apple','Canon','Wildcraft','Logitech','Unknown']), correct: item.quizAnswers[1] },
  ];

  document.getElementById('quiz-container').innerHTML = hints.map((h, i) =>
    '<div style="margin-bottom:16px">' +
    '<div style="font-size:13px;font-weight:600;margin-bottom:8px">Q' + (i+1) + '. ' + h.q + '</div>' +
    '<div class="quiz-options">' +
    h.options.map(o =>
      '<div class="quiz-opt" onclick="selectQuizOpt(this,' + i + ',\'' + o + '\',\'' + h.correct + '\')">○ ' + o + '</div>'
    ).join('') + '</div></div>'
  ).join('');
}

let quizAnswers = {};
function selectQuizOpt(el, qIdx, val, correct) {
  el.closest('.quiz-options').querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  quizAnswers[qIdx] = { val, correct, isCorrect: val.toLowerCase().includes(correct.toLowerCase()) || correct.toLowerCase().includes(val.toLowerCase()) };
}

function submitQuiz() {
  if (Object.keys(quizAnswers).length < 4) { alert('Please answer all 4 questions.'); return; }
  const score = Object.values(quizAnswers).filter(a => a.isCorrect).length;
  const pct = Math.round((score / 4) * 100);
  const msg = pct >= 75 ? '✅ Strong proof – your claim will be forwarded for admin review.' : pct >= 50 ? '⚠️ Moderate proof – additional verification may be required.' : '❌ Low proof score – your claim may be rejected.';
  alert('Quiz Complete!\n\nYou scored ' + score + '/4 (' + pct + '%)\n' + msg);
}

function shuffleWith(guaranteed, others) {
  const pool = [guaranteed, ...others.filter(o => o.toLowerCase() !== guaranteed.toLowerCase()).slice(0, 3)];
  return pool.sort(() => Math.random() - 0.5);
}

function updateReportType(val) {
  document.getElementById('type-lost').classList.toggle('selected', val === 'lost');
  document.getElementById('type-found').classList.toggle('selected', val === 'found');
}

function reportNext(step) {
  for (let i = 1; i <= 3; i++) {
    document.getElementById('report-step-' + i).style.display = i === step ? 'block' : 'none';
    const s = document.getElementById('step' + i);
    s.className = 'step-item' + (i < step ? ' done' : i === step ? ' active' : '');
  }
  if (step === 3) buildReview();
}

function buildReview() {
  const name = document.getElementById('r-name').value || '—';
  const cat = document.getElementById('r-category').value || '—';
  const date = document.getElementById('r-date').value || '—';
  const loc = document.getElementById('r-location').value || '—';
  const desc = document.getElementById('r-desc').value || '—';
  const uid = document.getElementById('r-uid').value || 'None';
  const type = document.querySelector('input[name="item-type"]:checked').value;
  document.getElementById('review-content').innerHTML =
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
    '<div><div style="font-size:11px;color:var(--text3);font-weight:700">TYPE</div><div style="font-weight:700;margin-top:2px">' + (type === 'lost' ? '📍 Lost' : '📦 Found') + '</div></div>' +
    '<div><div style="font-size:11px;color:var(--text3);font-weight:700">ITEM</div><div style="font-weight:700;margin-top:2px">' + name + '</div></div>' +
    '<div><div style="font-size:11px;color:var(--text3);font-weight:700">CATEGORY</div><div style="margin-top:2px">' + cat + '</div></div>' +
    '<div><div style="font-size:11px;color:var(--text3);font-weight:700">DATE</div><div style="margin-top:2px">' + date + '</div></div>' +
    '<div style="grid-column:span 2"><div style="font-size:11px;color:var(--text3);font-weight:700">LOCATION</div><div style="margin-top:2px">' + loc + '</div></div>' +
    '<div style="grid-column:span 2"><div style="font-size:11px;color:var(--text3);font-weight:700">DESCRIPTION</div><div style="margin-top:2px;font-size:13px">' + desc + '</div></div>' +
    '<div style="grid-column:span 2"><div style="font-size:11px;color:var(--text3);font-weight:700">UNIQUE IDENTIFIERS</div><div style="margin-top:2px;font-size:13px">' + uid + '</div></div></div>';
}

function submitReport() {
  const id = 'RPT-' + Math.floor(1000 + Math.random() * 9000);
  document.getElementById('report-id-display').textContent = id;
  reportNext(1);
  openModal('success-modal');
}

function triggerUpload(id) { document.getElementById(id).click(); }

function previewPhotos(input) {
  const container = document.getElementById('photo-previews');
  container.innerHTML = '';
  Array.from(input.files).forEach(f => {
    const url = URL.createObjectURL(f);
    container.innerHTML += '<div style="width:80px;height:80px;border-radius:10px;overflow:hidden;border:2px solid var(--border)">' +
      '<img src="' + url + '" style="width:100%;height:100%;object-fit:cover"></div>';
  });
}

function handleIdUpload(input) {
  if (!input.files[0]) return;
  const url = URL.createObjectURL(input.files[0]);
  document.getElementById('id-preview').innerHTML =
    '<div style="margin-top:10px;display:flex;align-items:center;gap:10px;background:#E8F5E9;border:1px solid #C8E6C9;border-radius:10px;padding:10px">' +
    '<img src="' + url + '" style="width:60px;height:40px;object-fit:cover;border-radius:6px">' +
    '<span style="color:#16A34A;font-weight:700;font-size:13px">✅ ID Card uploaded</span></div>';
}

function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});