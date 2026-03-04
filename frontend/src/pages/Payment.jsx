import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Shield, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import styles from './Payment.module.css';

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'bank', label: 'Bank Transfer', icon: Shield },
];

function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setConfirmed(true);
  };

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <span className={styles.heroBadge}>Payment</span>
            <h1 className={styles.heroTitle}>Secure checkout</h1>
            <p className={styles.heroDescription}>
              Complete your payment securely. All transactions are encrypted and processed through our secure payment gateway.
            </p>
          </div>
        </section>

        <section className={styles.paymentSection}>
          <div className={styles.paymentContainer}>
            <AnimatePresence mode="wait">
              {confirmed ? (
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={styles.confirmed}
                >
                  <div className={styles.confirmedIcon}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className={styles.confirmedTitle}>Payment confirmed</h2>
                  <p className={styles.confirmedDescription}>
                    Your payment has been processed successfully. You'll receive a confirmation email shortly with your receipt and project details.
                  </p>
                  <p className={styles.transactionId}>
                    Transaction ID: VXS-2026-{Math.random().toString(36).slice(2, 8).toUpperCase()}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="payment-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={styles.grid}
                >
                  <div className={styles.summary}>
                    <div className={styles.summaryCard}>
                      <h3 className={styles.summaryTitle}>Project Summary</h3>
                      <div className={styles.summaryItems}>
                        <div className={styles.summaryItem}>
                          <span className={styles.itemLabel}>UI Development</span>
                          <span className={styles.itemValue}>$12,000</span>
                        </div>
                        <div className={styles.summaryItem}>
                          <span className={styles.itemLabel}>Design System</span>
                          <span className={styles.itemValue}>$8,000</span>
                        </div>
                        <div className={styles.summaryItem}>
                          <span className={styles.itemLabel}>Performance Audit</span>
                          <span className={styles.itemValue}>$2,500</span>
                        </div>
                        <div className={styles.summaryTotal}>
                          <span className={styles.totalLabel}>Total</span>
                          <span className={styles.totalValue}>$22,500</span>
                        </div>
                      </div>
                      <div className={styles.securityBadge}>
                        <Shield size={14} />
                        <span>256-bit SSL encrypted. Your data is secure.</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handlePay} className={styles.form}>
                    <div className={styles.formCard}>
                      <h3 className={styles.formTitle}>Payment Method</h3>
                      <div className={styles.methodButtons}>
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setSelectedMethod(method.id)}
                            className={`${styles.methodBtn} ${selectedMethod === method.id ? styles.methodBtnActive : ''}`}
                          >
                            <method.icon size={20} />
                            <span>{method.label}</span>
                          </button>
                        ))}
                      </div>

                      {selectedMethod === 'card' && (
                        <div className={styles.cardFields}>
                          <div className={styles.field}>
                            <label htmlFor="cardName" className={styles.label}>Name on Card</label>
                            <input id="cardName" type="text" required placeholder="John Doe" className={styles.input} />
                          </div>
                          <div className={styles.field}>
                            <label htmlFor="cardNumber" className={styles.label}>Card Number</label>
                            <input id="cardNumber" type="text" required placeholder="4242 4242 4242 4242" maxLength={19} className={styles.input} />
                          </div>
                          <div className={styles.fieldRow}>
                            <div className={styles.field}>
                              <label htmlFor="expiry" className={styles.label}>Expiry Date</label>
                              <input id="expiry" type="text" required placeholder="MM / YY" maxLength={7} className={styles.input} />
                            </div>
                            <div className={styles.field}>
                              <label htmlFor="cvc" className={styles.label}>CVC</label>
                              <input id="cvc" type="text" required placeholder="123" maxLength={4} className={styles.input} />
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedMethod === 'bank' && (
                        <div className={styles.bankInfo}>
                          <p>
                            Bank transfer details will be sent to your email after confirmation. Payment must be received within 5 business days to secure your project slot.
                          </p>
                        </div>
                      )}

                      <button type="submit" disabled={loading} className={styles.submitBtn}>
                        {loading ? (
                          <>
                            <Loader2 size={16} className={styles.spinner} />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock size={14} />
                            Pay $22,500
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Payment;
