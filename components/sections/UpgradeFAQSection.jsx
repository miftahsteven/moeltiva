'use client';

import { useState } from 'react';
import styles from './UpgradeFAQSection.module.css';

const faqs = [
  {
    question: 'Apakah Moeltiva menggunakan gula tambahan?',
    answer: 'Moeltiva tidak menggunakan gula pasir. Kami menggunakan pemanis alami Stevia yang memiliki nol kalori, sehingga lebih sehat dan aman dikonsumsi setiap hari tanpa khawatir lonjakan gula darah.'
  },
  {
    question: 'Apakah Moeltiva aman untuk penderita asam lambung?',
    answer: 'Ya, sangat aman. Alpukat secara alami bersifat basa yang dapat membantu menetralkan asam lambung. Moeltiva juga bebas pengawet dan bahan kimia yang biasanya memicu iritasi lambung.'
  },
  {
    question: 'Kapan waktu terbaik untuk mengonsumsi Moeltiva?',
    answer: 'Moeltiva sangat baik dikonsumsi di pagi hari sebagai penambah energi harian, atau di sore hari sebagai camilan sehat yang mengenyangkan berkat kandungan serat alaminya yang tinggi.'
  },
  {
    question: 'Apakah anak-anak boleh mengonsumsi Moeltiva?',
    answer: 'Tentu saja. Moeltiva kaya akan nutrisi, serat, dan vitamin yang sangat baik untuk masa pertumbuhan anak-anak sebagai alternatif minuman bernutrisi yang lezat.'
  },
  {
    question: 'Bagaimana cara penyajian Moeltiva yang paling nikmat?',
    answer: 'Cukup larutkan 1 sachet Moeltiva ke dalam 150ml air. Untuk rasa terbaik, gunakan air dingin atau tambahkan es batu agar teksturnya terasa lebih creamy dan menyegarkan seperti jus alpukat asli.'
  }
];

export default function UpgradeFAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.section} aria-label="Upgrade and FAQ section">
      <div className="container">
        {/* Top Part: Upgrade Info */}
        <div className={styles.upgradeRow}>
          <div className={`${styles.upgradeContent} reveal-left`}>
            <h2 className={styles.title}>
              Moeltiva meng-upgrade <br />
              <span className={styles.highlight}>cara menikmati alpukat.</span>
            </h2>

            <div className={styles.list}>
              <div className={styles.listGroup}>
                <div className={styles.listItem}>
                  <span className={styles.checkIcon}>✕</span>
                  <span>Tanpa menunggu musimnya.</span>
                </div>
                <div className={styles.listItem}>
                  <span className={styles.checkIcon}>✕</span>
                  <span>Tanpa repot memilih buah.</span>
                </div>
                <div className={styles.listItem}>
                  <span className={styles.checkIcon}>✕</span>
                  <span>Tanpa takut busuk.</span>
                </div>
                <div className={styles.listItem}>
                  <span className={styles.checkIcon}>✕</span>
                  <span>Tanpa proses ribet.</span>
                </div>
              </div>

              <div className={styles.listGroup}>
                <div className={styles.listItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span><strong>Cukup diseduh.</strong></span>
                </div>
                <div className={styles.listItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Rasa dan teksturnya konsisten seperti jus alpukat segar.</span>
                </div>
                <div className={styles.listItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>Praktis dikonsumsi kapan saja, dengan umur simpan yang lebih panjang.</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.imageCol} reveal-right`}>
            <div className={styles.imageWrap}>
              <img
                src="/moeltiva-images/faq2.JPG"
                alt="Moeltiva premium avocado powder drink packaging"
                className={styles.productImg}
              />
            </div>
          </div>
        </div>

        {/* Bottom Part: FAQ */}
        <div className={styles.faqRow}>
          <div className={`${styles.faqHeader} reveal-left`}>
            <div className="section-label mb-2">✦ FAQ</div>
            <h2>Frequently Asked Questions</h2>
            <p>Punya pertanyaan seputar Moeltiva? Temukan jawabannya di sini.</p>
          </div>

          <div className={`${styles.faqList} reveal-right`}>
            <div className={styles.accordion}>
              {faqs.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}
                >
                  <button
                    className={styles.accordionHeader}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={activeIndex === index}
                  >
                    <span className={styles.question}>{item.question}</span>
                    <span className={styles.icon} />
                  </button>
                  <div className={styles.accordionContent}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
