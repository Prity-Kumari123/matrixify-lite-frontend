import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const upload = async (file) => {
    if (!file) return

    setLoading(true)

    const form = new FormData()
    form.append("file", file)

    try {
      const response = await fetch("http://127.0.0.1:8000/import/products", {
        method: "POST",
        body: form,
      })

      const data = await response.json()

      console.log("API response:", data);
      setResult(data)
    } catch (err) {
      console.error("Upload failed:", err)
      alert("Upload failed. Check backend.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopify Import Engine</h2>

      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={e => upload(e.target.files[0])}
      />

      {loading && <p>Uploading...</p>}
      
      {result && (
        <pre style={{ marginTop: "20px", textAlign: "left" }}>
          {JSON.stringify(result, null, 2)}
          
        </pre>
      )}
    </div>
  )
}

export default App
