import puppeteer from "puppeteer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Método não permitido");
  }

  const dados = req.body;

  const htmlContrato = `
    <html>
    <body>
      <h1>Contrato de Locação</h1>
      <p>Locatário: ${dados.locatario}</p>
      <p>CPF: ${dados.cpf}</p>
      <p>Endereço: ${dados.endereco}</p>
    </body>
    </html>
  `;

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(htmlContrato);
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=contrato.pdf');
  res.send(pdfBuffer);
}