// Finance.jsx — ПОВЕРИТЕЛНА секция, защитена с парола.
// В repo-то/бъндъла стои само шифърът (finance.enc.json). Текстът се разшифрова
// в браузъра единствено при вярна парола (AES-256-GCM, ключ от PBKDF2). Грешна
// парола → разшифроването се проваля. Потребителят е козметичен гейт.
import React, { useState } from "react";
import enc from "./finance.enc.json";

const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function decrypt(password) {
  const km = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: b64(enc.salt), iterations: enc.iter, hash: "SHA-256" },
    km, { name: "AES-GCM", length: 256 }, false, ["decrypt"]
  );
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(enc.iv) }, key, b64(enc.ct));
  return new TextDecoder().decode(pt);
}

export default function Finance() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [html, setHtml] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (user.trim().toLowerCase() !== "наско") { setErr("Грешен потребител."); return; }
    setBusy(true);
    try {
      setHtml(await decrypt(pass));
    } catch {
      setErr("Грешна парола.");
    } finally {
      setBusy(false);
    }
  };

  if (html) {
    return (
      <section className="sec">
        <div className="finance" dangerouslySetInnerHTML={{ __html: html }} />
        <button className="reset" style={{ marginTop: 16 }} onClick={() => { setHtml(null); setPass(""); }}>🔒 Заключи отново</button>
      </section>
    );
  }

  return (
    <section className="sec">
      <form className="lock" onSubmit={submit}>
        <div className="lock-icon">🔒</div>
        <h3>Поверително</h3>
        <p>Финансовият модел е защитен. Влез с потребител и парола.</p>
        <input className="lock-in" placeholder="потребител" autoComplete="username" value={user} onChange={(e) => setUser(e.target.value)} />
        <input className="lock-in" type="password" placeholder="парола" autoComplete="current-password" value={pass} onChange={(e) => setPass(e.target.value)} />
        <button className="lock-btn" type="submit" disabled={busy}>{busy ? "…" : "Отключи"}</button>
        {err && <div className="lock-err">{err}</div>}
      </form>
    </section>
  );
}
