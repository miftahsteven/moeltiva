'use client';

import { useState } from 'react';
import styles from './OrderForm.module.css';
import api from '@/services/api';

const initialForm = {
  nama: '',
  noHp: '',
  alamat: '',
  jumlah: 1,
  catatan: '',
};

export default function OrderForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.nama.trim()) e.nama = 'Nama wajib diisi';
    if (!form.noHp.trim()) e.noHp = 'Nomor HP wajib diisi';
    else if (!/^[0-9]{9,15}$/.test(form.noHp.replace(/[\s-]/g, ''))) e.noHp = 'Nomor HP tidak valid';
    if (!form.alamat.trim()) e.alamat = 'Alamat wajib diisi';
    if (form.jumlah < 1) e.jumlah = 'Minimal 1 produk';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'jumlah' ? Number(value) : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      // Dummy POST via axios — replace with real endpoint
      await new Promise(res => setTimeout(res, 1500)); // simulate latency
      // await api.post('/orders', form); // real endpoint
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      console.error('Order error:', err);
      alert('Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const total = form.jumlah * 125000;
  const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(total);

  return (
    <section id="order" className={styles.section} aria-label="Order Form">
      <div className={styles.bgPattern} aria-hidden="true" />
      <div className="container">
        <div className={`text-center mb-5 reveal`}>
          <div className="section-label mb-2">✦ Pemesanan</div>
          <h2 className="section-title" style={{ color: 'white' }}>Pesan Moeltiva Sekarang</h2>
          <p className={styles.sectionSub}>
            Isi form di bawah dan tim kami akan menghubungimu segera untuk konfirmasi pesanan.
          </p>
        </div>

        <div className={`${styles.formCard} reveal`}>
          {success ? (
            <div className={styles.successState} id="order-success-msg">
              <div className={styles.successIcon}>🎉</div>
              <h3>Pesanan Berhasil Dikirim!</h3>
              <p>Terima kasih, <strong>{form.nama || 'Kamu'}</strong>! Tim Moeltiva akan segera menghubungimu untuk konfirmasi pesanan.</p>
              <button
                className="btn-moeltiva-primary mt-3"
                onClick={() => setSuccess(false)}
                id="order-new-btn"
              >
                Buat Pesanan Baru
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form-moeltiva" noValidate aria-label="Order form">
              <div className={styles.formGrid}>
                {/* Nama */}
                <div className={styles.formGroup}>
                  <label htmlFor="order-nama" className="form-label">Nama Lengkap *</label>
                  <input
                    id="order-nama"
                    type="text"
                    name="nama"
                    className={`form-control ${errors.nama ? styles.inputError : ''}`}
                    placeholder="Contoh: Rina Santoso"
                    value={form.nama}
                    onChange={handleChange}
                    aria-describedby={errors.nama ? 'nama-error' : undefined}
                  />
                  {errors.nama && <span id="nama-error" className={styles.errorMsg} role="alert">{errors.nama}</span>}
                </div>

                {/* No HP */}
                <div className={styles.formGroup}>
                  <label htmlFor="order-hp" className="form-label">Nomor HP / WhatsApp *</label>
                  <input
                    id="order-hp"
                    type="tel"
                    name="noHp"
                    className={`form-control ${errors.noHp ? styles.inputError : ''}`}
                    placeholder="Contoh: 08123456789"
                    value={form.noHp}
                    onChange={handleChange}
                    aria-describedby={errors.noHp ? 'hp-error' : undefined}
                  />
                  {errors.noHp && <span id="hp-error" className={styles.errorMsg} role="alert">{errors.noHp}</span>}
                </div>

                {/* Alamat */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="order-alamat" className="form-label">Alamat Lengkap *</label>
                  <textarea
                    id="order-alamat"
                    name="alamat"
                    className={`form-control ${errors.alamat ? styles.inputError : ''}`}
                    placeholder="Jl. Sehat No. 1, Kota, Provinsi, Kode Pos"
                    rows={3}
                    value={form.alamat}
                    onChange={handleChange}
                    aria-describedby={errors.alamat ? 'alamat-error' : undefined}
                  />
                  {errors.alamat && <span id="alamat-error" className={styles.errorMsg} role="alert">{errors.alamat}</span>}
                </div>

                {/* Jumlah */}
                <div className={styles.formGroup}>
                  <label htmlFor="order-jumlah" className="form-label">Jumlah Box *</label>
                  <div className={styles.counterRow}>
                    <button
                      type="button"
                      className={styles.counterBtn}
                      onClick={() => setForm(p => ({ ...p, jumlah: Math.max(1, p.jumlah - 1) }))}
                      aria-label="Kurangi jumlah"
                      id="order-jumlah-minus"
                    >−</button>
                    <input
                      id="order-jumlah"
                      type="number"
                      name="jumlah"
                      className={`form-control ${styles.counterInput} ${errors.jumlah ? styles.inputError : ''}`}
                      min={1}
                      max={99}
                      value={form.jumlah}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className={styles.counterBtn}
                      onClick={() => setForm(p => ({ ...p, jumlah: Math.min(99, p.jumlah + 1) }))}
                      aria-label="Tambah jumlah"
                      id="order-jumlah-plus"
                    >+</button>
                  </div>
                  {errors.jumlah && <span className={styles.errorMsg} role="alert">{errors.jumlah}</span>}
                </div>

                {/* Total */}
                <div className={styles.formGroup}>
                  <label className="form-label">Total Harga</label>
                  <div className={styles.totalDisplay}>
                    <span className={styles.totalAmount}>{formatted}</span>
                    {form.jumlah >= 2 && (
                      <span className={styles.freeShipping}>🚚 Gratis Ongkir!</span>
                    )}
                  </div>
                </div>

                {/* Catatan */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="order-catatan" className="form-label">Catatan (opsional)</label>
                  <textarea
                    id="order-catatan"
                    name="catatan"
                    className="form-control"
                    placeholder="Contoh: Tolong dikemas dengan rapi. Atau varian rasa tertentu."
                    rows={2}
                    value={form.catatan}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className={styles.submitRow}>
                <button
                  type="submit"
                  id="order-submit-btn"
                  className={`btn-moeltiva-primary ${styles.submitBtn} ${loading ? styles.loading : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Memproses...
                    </>
                  ) : (
                    <>👉 Pesan Sekarang</>
                  )}
                </button>
                <p className={styles.submitNote}>
                  🔒 Data kamu aman. Kami tidak akan membagikan informasimu.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
