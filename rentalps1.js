const SELLER_WA="6285782329752"; // GANTI dengan nomor WhatsApp penjual

const products=[
 ["Rental PS 3",6000],["Rental PS 4",9000]
 
];
let cart={};2.3/2

const rupiah=n=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);

function renderProducts(){
 document.getElementById("products").innerHTML=products.map((p,i)=>`
 <div class="product">
   <h3>${p[0]}</h3><div class="price">${rupiah(p[1])}</div>
   <div class="controls">
    <button type="button" onclick="changeQty(${i},-1)">−</button>
    <span class="qty" id="q${i}">0</span>
    <button type="button" onclick="changeQty(${i},1)">+</button>
   </div>
 </div>`).join("");
}
function changeQty(i,d){
 cart[i]=(cart[i]||0)+d;
 if(cart[i]<0)cart[i]=0;
 document.getElementById("q"+i).textContent=cart[i];
 renderCart();
}
function renderCart(){
 let rows="",total=0;
 Object.keys(cart).forEach(i=>{
  if(!cart[i])return;
  let sub=cart[i]*products[i][1]; total+=sub;
  rows+=`<div class="cart-row"><span>${products[i][0]} × ${cart[i]}</span><b>${rupiah(sub)}</b></div>`;
 });
 document.getElementById("cart").innerHTML=rows||"Belum ada produk.";
 document.getElementById("total").textContent="Total: "+rupiah(total);
}
function resetOrder(){
 cart={};renderProducts();renderCart();document.getElementById("orderForm").reset();
}
document.getElementById("orderForm").addEventListener("submit",e=>{
 e.preventDefault();
 let items=[],total=0;
 Object.keys(cart).forEach(i=>{
  if(cart[i]){items.push(`${products[i][0]} x${cart[i]}`);total+=cart[i]*products[i][1]}
 });
 if(!items.length){alert("Pilih minimal* 1 produk.");return}
 let msg=`*PESANAN RENTAL PS & FOOD*%0A%0A`+
 `Nama: ${nama.value}%0AUmur: ${umur.value}%0AWhatsApp: ${wa.value}%0AAlamat: ${alamat.value}%0A`+
 `Meja/PS: ${meja.value||"Tidak rental PS"}%0ALama main: ${jam.value||"-"} jam%0AMulai: ${mulai.value||"-"}%0A%0A`+
 `*Pesanan:*%0A${items.join("%0A")}%0A%0A*Total: ${rupiah(total)}*`;
 window.open(`https://wa.me//${SELLER_WA}?text=${msg}`,"_blank");
});
renderProducts();renderCart();6