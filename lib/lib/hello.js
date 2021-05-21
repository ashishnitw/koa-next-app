export default function handlerHello(req, res) {
  res.status(200).json({ text: 'Hello' })
}