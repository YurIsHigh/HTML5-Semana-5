// Array de objetos de exemplo (incluindo alguns inválidos para teste)
const pedidos = [
  { cliente: "Bia", valor: 120, status: "pago" },
  { cliente: "Carlos", valor: 250, status: "pendente" },
  { cliente: "Ana", valor: 80, status: "pago" },
  { cliente: "Yuri", valor: 150, status: "pago" },          
  { cliente: "Pedro", valor: -50, status: "pago" },      
  { cliente: "Lucas", valor: "cem", status: "pago" },
  { cliente: "Mariana", valor: 300, status: "pago" }
];

const pedidosValidos = pedidos.filter(pedido => {
  const clienteValido = typeof pedido.cliente === "string" && pedido.cliente.trim() !== "";
  const valorValido = typeof pedido.valor === "number" && !isNaN(pedido.valor) && pedido.valor > 0;
  
  return clienteValido && valorValido;
});

const pedidosPagos = pedidosValidos.filter(pedido => pedido.status === "pago");

const totalFaturado = pedidosPagos.reduce((acumulador, pedido) => {
  return acumulador + pedido.valor;
}, 0);

const relatorioTexto = pedidosPagos.map(pedido => {
  return `${pedido.cliente} — R$ ${pedido.valor.toFixed(2)}`;
});

console.log("--- Pedidos Válidos e Pagos ---");
console.log(pedidosPagos);

console.log("\n--- Relatório Formatado ---");
relatorioTexto.forEach(texto => console.log(texto));

console.log("\n--- Total Faturado ---");
console.log(`R$ ${totalFaturado.toFixed(2)}`);

//VERSÃO OTIMIZADA:

const relatorioDireto = pedidos
  // Validação
  .filter(p => p.cliente && p.cliente.trim() !== "" && typeof p.valor === "number" && p.valor > 0)
  // Status Pago
  .filter(p => p.status === "pago")
  // Formatação em Texto
  .map(p => `${p.cliente} — R$ ${p.valor.toFixed(2)}`);

console.log(relatorioDireto);