"use client";
import type { TocItem } from "@/app/components/TableOfContents";
import DocLayout, { PageFooter } from "@/app/components/DocLayout";
import MathBlock from "@/app/components/MathBlock";

const toc: TocItem[] = [
  { id: "intro", title: "توضیحات مبتنی بر نمونه", level: 2 },
  { id: "s1", title: "نمونه‌های اولیه و استثناها (Proto & Critic)", level: 2 },
  { id: "s2", title: "توضیحات خلاف‌واقع (Counterfactual)", level: 2 },
  { id: "s3", title: "نمونه‌های متخاصم (Adversarial Examples)", level: 2 },
];

export default function Chapter5() {
  return (
    <DocLayout
      toc={toc}
      prev={{ href: "/chapter/4", title: "روش‌های مستقل از مدل" }}
    >
      <div>
        <div className="chapter-eyebrow" style={{ background: "#ECFEFF", color: "#0E7490" }}>
          CHAPTER 05
        </div>
        <h1 id="intro" className="chapter-title" style={{ scrollMarginTop: 80 }}>
          توضیحات مبتنی بر نمونه
        </h1>
        <p className="chapter-lead">
          گاهی توضیح رفتار یک مدل با ارائه‌ی نمونه‌های انتخاب‌شده از داده‌ها (به جای فرمول یا
          وزن)، برای انسان بسیار مقبول‌تر و قابل درک‌تر است. در این فصل با روش‌هایی مانند
          نمونه‌های اولیه و استثناها، توضیحات خلاف‌واقع و نمونه‌های متخاصم آشنا می‌شویم.
        </p>

        <div className="info-box teal">
          <span className="info-icon">⚠️</span>
          <div className="info-content">
            <strong>وضعیت فصل</strong>
            این فصل به صورت خلاصه ارائه شده است. متن کامل در نسخه‌های بعدی اضافه خواهد شد.
            در حال حاضر فرمول‌ها و زیرساخت‌های اصلی در دسترس می‌باشند.
          </div>
        </div>

        {/* 5.1 Prototypes */}
        <h2 id="s1" className="section-heading">
          ۵-۱. نمونه‌های اولیه و استثناها (Prototypes & Criticisms)
        </h2>
        <p className="para">
          یک <span className="term-inline">نمونه اولیه (Prototype)</span>، نقطه داده‌ای است که نماینده
          تمام داده‌ها محسوب می‌شود. یک <span className="term-inline">استثنا (Criticism)</span>{" "}
          نقطه داده‌ای است که توسط مجموعه نمونه‌های اولیه به خوبی نمایندگی نمی‌شود.
        </p>

        <h3 className="subsection-heading">نظریه MMD-critic</h3>
        <p className="para">
          مطلوبیت نمونه‌های اولیه با معیار MMD (Maximum Mean Discrepancy) بین توزیع نمونه‌ها و
          توزیع کل داده‌ها سنجیده می‌شود:
        </p>
        <div className="math-block-label">معیار MMD²</div>
        <MathBlock>
          MMD² = (1/m²) Σᵢⱼ k(zᵢ, zⱼ) - (2/mn) Σᵢⱼ k(zᵢ, xⱼ) + (1/n²) Σᵢⱼ k(xᵢ, xⱼ)
        </MathBlock>
        <p className="para">
          که در آن k یک تابع کرنل مثبت-معین است (معمولاً گاوسی RBF):
        </p>
        <div className="math-block-label">کرنل گاوسی RBF</div>
        <MathBlock>
          {`k(x, x′) = exp(-γ · ||x − x′||²)`}
        </MathBlock>
        <p className="para">تابع شاهد برای یافتن استثناها (کمی‌شمارترین نقاط):</p>
        <div className="math-block-label">تابع witness برای یافتن استثناها</div>
        <MathBlock>
          witness(x) = (1/n) Σᵢ k(x, xᵢ)  -  (1/m) Σⱼ k(x, zⱼ)
        </MathBlock>

        {/* 5.2 Counterfactual */}
        <h2 id="s2" className="section-heading">
          ۵-۲. توضیحات خلاف‌واقع (Counterfactual Explanations)
        </h2>
        <p className="para">
          یک توضیح خلاف‌واقع به این صورت بیان می‌شود: «اگر ورودی‌ها این‌طور نبودند، نتیجه چگونه
          می‌بود؟». هدف یافتن کوچک‌ترین تغییری در x است که خروجی را به خروجی مطلوب تغییر دهد.
        </p>
        <div className="info-box violet">
          <span className="info-icon">🎯</span>
          <div className="info-content">
            <strong>ویژگی‌های یک توضیح خلاف‌واقع مطلوب</strong>
            ۱. تفاوت حداقلی با نمونه اصلی (Sparsity & Distance)<br />
            ۲. تغییرات معقول و واقع‌بینانه (Plausibility)<br />
            ۳. تولید چند توضیح متنوع برای یک پیش‌بینی (Diversity)
          </div>
        </div>

        {/* 5.3 Adversarial */}
        <h2 id="s3" className="section-heading">
          ۵-۳. نمونه‌های متخاصم (Adversarial Examples)
        </h2>
        <p className="para">
          نمونه متخاصم، نمونه‌ای است که با اعمال یک اختلاف بسیار کوچک (غیرقابل تشخیص برای انسان)
          به یک نمونه، به طور عمدی مدل را به اشتباه می‌اندازد. این روش‌ها نه تنها جنبه‌ی امنیتی
          دارند، بلکه در درک شکنندگی مدل‌ها و نقاط کورر نیز بسیار مفید واقع می‌شوند.
        </p>
        <div className="info-box gold">
          <span className="info-icon">🛡️</span>
          <div className="info-content">
            <strong>پیچ، FGSM و PGD</strong>
            متداول‌ترین روش‌های تولید نمونه متخاصم عبارتند از: اتصال ساده در جهت گرادیان (FGSM)،
            تکراری کردن آن (PGD) و بهینه‌سازی مستقیم با قیود (CW). متن کامل در نسخه‌های بعدی اضافه خواهد شد.
          </div>
        </div>

        <PageFooter prev={{ href: "/chapter/4", title: "روش‌های مستقل از مدل" }} />
      </div>
    </DocLayout>
  );
}
