const orders=[
 {id:"#1048",customer:"Ama Mensah",product:"Nova X Headphones",date:"Sep 22, 2026",amount:"$189",status:"Completed"},
 {id:"#1047",customer:"Kwame Boateng",product:"AeroFit Smart Watch",date:"Sep 22, 2026",amount:"$249",status:"Pending"},
 {id:"#1046",customer:"Kojo Asare",product:"Urban Classic Sneakers",date:"Sep 21, 2026",amount:"$120",status:"Completed"},
 {id:"#1045",customer:"Akua Owusu",product:"Leather Backpack",date:"Sep 21, 2026",amount:"$95",status:"Completed"},
 {id:"#1044",customer:"Yaw Mensimah",product:"Mechanical Keyboard",date:"Sep 20, 2026",amount:"$139",status:"Cancelled"},
 {id:"#1043",customer:"Esi Addo",product:"Studio Desk Lamp",date:"Sep 20, 2026",amount:"$74",status:"Completed"},
 {id:"#1042",customer:"Nana Osei",product:"CloudSoft Hoodie",date:"Sep 19, 2026",amount:"$68",status:"Pending"}
];

const customers=[
 ["AM","Ama Mensah","128 orders","$3,840"],
 ["KB","Kwame Boateng","94 orders","$2,916"],
 ["KO","Kojo Asare","87 orders","$2,540"],
 ["AO","Akua Owusu","72 orders","$2,184"],
 ["EO","Esi Addo","65 orders","$1,920"]
];

const products=[
 ["1","Nova X Headphones","284 sold","$53,676"],
 ["2","AeroFit Smart Watch","231 sold","$57,519"],
 ["3","Urban Classic Sneakers","198 sold","$23,760"],
 ["4","Leather Backpack","167 sold","$15,865"],
 ["5","Mechanical Keyboard","142 sold","$19,738"]
];

const revenue6=[42,58,49,76,68,91];
const revenue12=[48,52,45,60,56,72,65,78,71,84,79,91];
const months6=["Apr","May","Jun","Jul","Aug","Sep"];
const months12=["Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"];

const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

function toast(message){
 const el=$("#toast"); el.textContent=message; el.classList.add("show");
 clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>el.classList.remove("show"),2200);
}

function renderChart(){
 const values=$("#periodSelect").value==="12"?revenue12:revenue6;
 const labels=$("#periodSelect").value==="12"?months12:months6;
 const max=Math.max(...values);
 $("#revenueChart").innerHTML=values.map((v,i)=>`<div class="bar" style="height:${Math.max(15,v/max*92)}%"><em>$${v}k</em><span>${labels[i]}</span></div>`).join("");
}

function statusClass(status){return status.toLowerCase().replace(" ","-")}

function renderOrders(list=orders){
 $("#ordersTable").innerHTML=list.map(o=>`<tr>
 <td><strong>${o.id}</strong></td><td>${o.customer}</td><td>${o.product}</td><td>${o.date}</td><td><strong>${o.amount}</strong></td>
 <td><span class="status ${statusClass(o.status)}">${o.status}</span></td></tr>`).join("");
}

function renderCustomers(){
 $("#customersList").innerHTML=customers.map(c=>`<div class="customer"><div class="person"><div class="mini-avatar">${c[0]}</div><div><strong>${c[1]}</strong><span>${c[2]}</span></div></div><b class="value">${c[3]}</b></div>`).join("");
}

function renderProducts(){
 $("#productsList").innerHTML=products.map(p=>`<div class="product"><div class="rank">${p[0]}</div><div><strong>${p[1]}</strong><span>${p[2]}</span></div><b class="value">${p[3]}</b></div>`).join("");
}

function filterOrders(){
 const q=$("#searchInput").value.trim().toLowerCase();
 const filtered=orders.filter(o=>Object.values(o).some(v=>v.toLowerCase().includes(q)));
 renderOrders(filtered);
 if(q) toast(`${filtered.length} matching order${filtered.length===1?"":"s"} found`);
}

$("#searchInput").addEventListener("input",filterOrders);
$("#periodSelect").addEventListener("change",renderChart);

$("#exportBtn").addEventListener("click",()=>{
 const rows=[["Order","Customer","Product","Date","Amount","Status"],...orders.map(o=>[o.id,o.customer,o.product,o.date,o.amount,o.status])];
 const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
 const blob=new Blob([csv],{type:"text/csv"});
 const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="website-dashboard-orders.csv"; a.click(); URL.revokeObjectURL(a.href);
 toast("Report exported successfully");
});

$("#viewAllBtn").addEventListener("click",()=>{renderOrders(orders);$("#searchInput").value="";toast("Showing all recent orders")});
$("#notificationBtn").addEventListener("click",()=>toast("You have 3 new notifications"));

$("#themeBtn").addEventListener("click",()=>{
 document.body.classList.toggle("dark");
 const dark=document.body.classList.contains("dark");
 localStorage.setItem("dashboard-theme",dark?"dark":"light");
 $("#themeBtn span").textContent=dark?"Light mode":"Dark mode";
 toast(dark?"Dark mode enabled":"Light mode enabled");
});

if(localStorage.getItem("dashboard-theme")==="dark"){
 document.body.classList.add("dark");
 $("#themeBtn span").textContent="Light mode";
}

$("#signOutBtn").addEventListener("click",()=>toast("Demo sign-out action"));
$("#menuBtn").addEventListener("click",()=>{
 $("#sidebar").classList.toggle("open");
 $("#overlay").classList.toggle("show");
});
$("#overlay").addEventListener("click",()=>{
 $("#sidebar").classList.remove("open");$("#overlay").classList.remove("show");
});
$$(".nav-link").forEach(link=>link.addEventListener("click",()=>{
 $$(".nav-link").forEach(x=>x.classList.remove("active"));link.classList.add("active");
 $("#sidebar").classList.remove("open");$("#overlay").classList.remove("show");
}));

renderChart();renderOrders();renderCustomers();renderProducts();
