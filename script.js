const tableBody = document.querySelector("#tradeTable tbody");
const search = document.getElementById("search");

fetch("vndyne-Collection-2026-03-05.xlsx")
.then(res => res.arrayBuffer())
.then(data => {

const workbook = XLSX.read(data);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

function render(items){

tableBody.innerHTML="";

items.forEach(item => {

let row=document.createElement("tr");

row.innerHTML=`
<td>${item["Audio / Video"]||""}</td>
<td>${item["Show"]||""}</td>
<td>${item["Date"]||""}</td>
<td>${item["Master"]||""}</td>
<td>${item["Format"]||""}</td>
<td>${item["Venue"]||""}</td>
<td>${item["City"]||""}</td>
<td>${item["Notes"]||""}</td>
`;

tableBody.appendChild(row);

});

}

render(rows);

search.addEventListener("input",()=>{

let term=search.value.toLowerCase();

let filtered=rows.filter(r =>
Object.values(r).join(" ").toLowerCase().includes(term)
);

render(filtered);

});

});
