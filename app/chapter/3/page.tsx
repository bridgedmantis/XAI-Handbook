"use client";
import type { TocItem } from "@/app/components/TableOfContents";
import DocLayout, { PageFooter } from "@/app/components/DocLayout";
import MathBlock from "@/app/components/MathBlock";
import Figure from "@/app/components/Figure";

const toc: TocItem[] = [
  { id: "intro", title: "مدل‌های تفسیرپذیر", level: 2 },
  { id: "s1", title: "رگرسیون خطی", level: 2 },
  { id: "s1-1", title: "مفروضات مدل رگرسیون خطی", level: 3 },
  { id: "s1-2", title: "تفسیر ضرایب و معیار ارزیابی", level: 3 },
  { id: "s1-3", title: "اهمیت ویژگی‌ها و تفسیر بصری", level: 3 },
  { id: "s2", title: "رگرسیون لجستیک", level: 2 },
  { id: "s2-1", title: "چرا رگرسیون خطی برای طبقه‌بندی مناسب نیست؟", level: 3 },
  { id: "s2-2", title: "تئوری مدل", level: 3 },
  { id: "s2-3", title: "تفسیر ضرایب", level: 3 },
  { id: "s2-4", title: "مزایا و معایب", level: 3 },
  { id: "s3", title: "درخت تصمیم", level: 2 },
  { id: "s3-1", title: "تفسیر و اهمیت ویژگی‌ها", level: 3 },
  { id: "s3-2", title: "تجزیه درخت", level: 3 },
  { id: "s3-3", title: "مزایا و معایب درخت تصمیم", level: 3 },
  { id: "s4", title: "قوانین تصمیم", level: 2 },
  { id: "s4-1", title: "ساختار و مفاهیم پایه", level: 3 },
  { id: "s4-2", title: "استراتژی‌های ترکیب قوانین", level: 3 },
  { id: "s4-3", title: "الگوریتم‌های یادگیری قوانین", level: 3 },
  { id: "s4-4", title: "مزایا و معایب قوانین تصمیم", level: 3 },
  { id: "s5", title: "سایر مدل‌های تفسیرپذیر", level: 2 },
  { id: "s5-1", title: "طبقه‌بند بیز ساده", level: 3 },
  { id: "s5-2", title: "روش k همسایه نزدیک", level: 3 },
];

export default function Chapter3() {
  return (
    <DocLayout
      toc={toc}
      prev={{ href: "/chapter/2", title: "تفسیرپذیری" }}
      next={{ href: "/chapter/4", title: "روش‌های مستقل از مدل" }}
    >
      <div>
        <div className="chapter-eyebrow" style={{ background: "#ECFDF5", color: "#059669" }}>
          فصل ۳
        </div>
        <h1 id="intro" className="chapter-title" style={{ scrollMarginTop: 80 }}>
          مدل‌های تفسیرپذیر
        </h1>
        <p className="chapter-lead">
          ساده‌ترین راه برای دستیابی به تفسیرپذیری، استفاده از زیرمجموعه‌ای از الگوریتم‌هاست که
          به‌طور ذات ساختار قابل درکی دارند. در این فصل به بررسی رگرسیون خطی، رگرسیون لجستیک،
          درخت تصمیم، قوانین تصمیم و سایر مدل‌های تفسیرپذیر می‌پردازیم.
        </p>

        <p className="para">
          ساده‌ترین راه برای دستیابی به تفسیرپذیری، استفاده از زیرمجموعه‌ای از الگوریتم‌هاست که
          مدل‌های تفسیرپذیر (Interpretable Models) ایجاد می‌کنند. <span className="term-inline">رگرسیون
          خطی</span>، <span className="term-inline">رگرسیون لجستیک</span> و <span className="term-inline">درختان تصمیم</span>{" "}
          از جمله مدل‌های تفسیرپذیر بسیار رایج هستند.
        </p>
        <p className="para">
          تمامی مدل‌های بررسی شده در این فصل، به استثنای روش k همسایه نزدیک، در سطح ماژولار قابل
          تفسیر هستند. یک مدل زمانی خطی است که ارتباط بین ویژگی‌ها و هدف به صورت خطی مدل‌سازی شود.
          مدلی با محدودیت‌های یکنوایی (Monotonicity Constraints) تضمین می‌کند که رابطه بین یک
          ویژگی و خروجی هدف همواره در یک جهت مشخص حرکت کند که این امر تفسیر مدل را ساده‌تر می‌کند.
          همچنین، برخی مدل‌ها می‌توانند به طور خودکار تعاملات بین ویژگی‌ها (Feature Interactions) را
          در نظر بگیرند، هرچند تعاملات بیش از حد پیچیده می‌تواند به تفسیرپذیری آسیب برساند.
        </p>

        {/* 3.1 رگرسیون خطی */}
        <h2 id="s1" className="section-heading">
          ۳-۱. رگرسیون خطی (Linear Regression)
        </h2>
        <p className="para">
          یک مدل رگرسیون خطی، هدف را به عنوان مجموع وزن‌دار ویژگی‌های ورودی پیش‌بینی می‌کند.
          خطی بودنِ این رابطهِ یادگرفته‌شده، تفسیر آن را بسیار ساده می‌سازد. روابط
          یادگرفته‌شده در این مدل‌ها خطی هستند و برای یک نمونه منفرد i به صورت زیر نوشته می‌شوند:
        </p>

        <div className="math-block-label">رابطه کلی رگرسیون خطی</div>
        <MathBlock>
          y = β₀ + β₁ x₁ + β₂ x₂ + … + βₚ xₚ + ε
        </MathBlock>

        <p className="para">
          در این معادله، خروجی پیش‌بینی‌شده برای یک نمونه، مجموع وزن‌دارِ p ویژگی آن است.
          بتاها (βⱼ) نشان‌دهنده وزن‌ها یا ضرایب یادگرفته‌شده ویژگی‌ها هستند. اولین وزن در این
          مجموع (β₀) <span className="term-inline">عرض از مبدأ (Intercept)</span> نامیده می‌شود و در هیچ ویژگی
          ضرب نمی‌گردد. اپسیلون (ε) خطای مدل است؛ یعنی تفاوت بین پیش‌بینی و خروجی واقعی.
          فرض بر این است که این خطاها از یک توزیع گاوسی (Gaussian Distribution) پیروی می‌کنند.
        </p>

        <p className="para">
          برای تخمین وزن‌های بهینه معمولاً از روش{" "}
          <span className="term-inline">حداقل مربعات معمولی (Ordinary Least Squares - OLS)</span>{" "}
          استفاده می‌شود تا مجموع مربعات تفاضل بین خروجی‌های واقعی و پیش‌بینی‌شده حداقل گردد:
        </p>

        <div className="math-block-label">روش OLS برای تخمین وزن‌ها</div>
        <MathBlock>
          β̂ = arg min   Σᵢ₌₁…ₙ (y⁽ⁱ⁾ - (β₀ + Σⱼ₌₁…ₚ βⱼ xⱼ⁽ⁱ⁾))²
        </MathBlock>

        <p className="para">
          وزن‌های تخمین‌زده‌شده همراه با بازه‌های اطمینان (Confidence Intervals) ارائه می‌شوند؛
          به عنوان مثال، یک بازه اطمینان ۹۵ درصدی به این معناست که اگر تخمین را ۱۰۰ بار با داده‌های
          نمونه‌گیری شده جدید تکرار کنیم، در ۹۵ مورد وزن واقعی در این بازه قرار می‌گیرد.
        </p>

        {/* 3.1.1 مفروضات */}
        <h3 id="s1-1" className="subsection-heading">
          ۳-۱-۱. مفروضات مدل رگرسیون خطی
        </h3>
        <p className="para">
          اعتبار این مدل و تفسیرپذیری آن به رعایت مجموعه‌ای از مفروضات آماری بستگی دارد:
        </p>
        <ul className="styled-list">
          <li>
            <strong>خطی بودن:</strong> پیش‌بینی مجبور می‌شود ترکیب خطی از ویژگی‌ها باشد؛ این ویژگی‌ها
            اثرات خطی افزایشی دارند و به راحتی قابل تفکیک و کمی‌سازی هستند.
          </li>
          <li>
            <strong>نرمال بودن:</strong> بیان می‌کند خروجی هدف با توجه به ویژگی‌ها دارای توزیع نرمال است
            و در صورت نقض آن، بازه‌های اطمینان نامعتبر خواهند بود.
          </li>
          <li>
            <strong>هم‌واریانسی (Homoscedasticity):</strong> ایجاب می‌کند که واریانس عبارات خطا در کل
            فضای ویژگی ثابت باشد.
          </li>
          <li>
            <strong>استقلال نمونه‌ها:</strong> عدم وابستگی میان نمونه‌ها؛ در نظر گرفتن ویژگی‌های ورودی به عنوان
            ثوابتِ بدون خطای اندازه‌گیری.
          </li>
          <li>
            <strong>عدم وجود هم‌خطی چندگانه (Multicollinearity):</strong> وجود همبستگی شدید بین ویژگی‌ها، تخمین
            وزن‌ها را مختل کرده و تشخیص اثر هر ویژگی را غیرممکن می‌سازد.
          </li>
        </ul>

        {/* 3.1.2 تفسیر ضرایب */}
        <h3 id="s1-2" className="subsection-heading">
          ۳-۱-۲. تفسیر ضرایب و معیار ارزیابی
        </h3>
        <p className="para">
          تفسیر یک وزن در مدل رگرسیون خطی کاملاً به نوع ویژگی متناظر با آن بستگی دارد:
        </p>
        <ul className="styled-list">
          <li>
            برای یک <strong>ویژگی عددی</strong>، افزایش یک واحد در ویژگی، خروجی پیش‌بینی‌شده را دقیقاً به
            اندازه وزن آن ویژگی تغییر می‌دهد.
          </li>
          <li>
            در مورد <strong>ویژگی‌های دودویی و طبقه‌ای</strong> که معمولاً از رمزگذاری وان-هات (One-hot encoding)
            برای آن‌ها استفاده می‌شود، تغییر ویژگی از دسته مرجع به دسته دیگر باعث تغییر خروجی به
            اندازه وزن آن ویژگی می‌گردد.
          </li>
          <li>
            عرض از مبدأ (β₀) نشان‌دهنده پیش‌بینی مدل برای نمونه‌ای است که تمام ویژگی‌های عددی آن صفر و
            ویژگی‌های طبقه‌ای آن در دسته مرجع قرار داشته باشند.
          </li>
        </ul>

        <p className="para">
          برای ارزیابی میزان توضیح‌دهندگی مدل، از معیار <span className="term-inline">R²</span> استفاده می‌شود
          که نشان می‌دهد چه مقدار از واریانس کل خروجی هدف توسط مدل توضیح داده شده است:
        </p>

        <div className="math-block-label">ضریب تعیین R²</div>
        <MathBlock>
          R² = 1 - SSE / SST
        </MathBlock>

        <p className="para">
          که در آن SSE مجموع مربعات خطاها و SST مجموع مربعات واریانس داده‌ها است. از آنجا که با
          افزودن ویژگی‌های جدید (حتی بی‌ربط) مقدار R² افزایش می‌یابد، برای دستیابی به ارزیابی
          دقیق‌تر در متون علمی، استفاده از R² تعدیل‌شده (Adjusted R-squared) که تعداد ویژگی‌ها را
          نیز لحاظ می‌کند، توصیه می‌شود:
        </p>

        <div className="math-block-label">R² تعدیل‌شده</div>
        <MathBlock>
          R̄² = R² - (1 - R²) · p / (n - p - 1)
        </MathBlock>

        {/* 3.1.3 اهمیت ویژگی */}
        <h3 id="s1-3" className="subsection-heading">
          ۳-۱-۳. اهمیت ویژگی‌ها و تفسیر بصری
        </h3>
        <p className="para">
          اهمیت یک ویژگی در مدل رگرسیون خطی با مقدار قدر مطلق آماره t (t-statistic) اندازه‌گیری
          می‌شود که برابر است با وزن تخمین‌زده‌شده تقسیم بر خطای استاندارد آن:
        </p>

        <div className="math-block-label">آماره t برای اهمیت ویژگی</div>
        <MathBlock>
          t_β̂ⱼ = β̂ⱼ / SE(β̂ⱼ)
        </MathBlock>

        <p className="para">
          برای تحلیل راحت‌تر این مدل‌ها، استفاده از ابزارهای بصری بسیار کارآمد است:
        </p>
        <ul className="styled-list">
          <li>
            <strong>نمودار وزن (Weight Plot):</strong> وزن‌ها را به عنوان نقطه و بازه اطمینان آن‌ها را به عنوان
            خطوط نمایش می‌دهد.
          </li>
          <li>
            <strong>نمودار اثر (Effect Plot):</strong> توزیع اثرات (ضرب وزن هر ویژگی در مقدار واقعی آن در داده‌ها)
            را با استفاده از نمودارهای جعبه‌ای (Boxplots) در کل مجموعه داده به تصویر می‌کشد.
          </li>
        </ul>

        <Figure
          src="./images/weightsplot.png"
          caption="نمودار وزن‌ها در رگرسیون لاجستیک. وزن‌ها به‌صورت نقاط نمایش داده شده‌اند و خطوط، بازه‌های اطمینان ۹۵٪ متناظر را نشان می‌دهند."
          label="شکل ۳.۱"
        />

        {/* 3.2 رگرسیون لجستیک */}
        <h2 id="s2" className="section-heading">
          ۳-۲. رگرسیون لجستیک (Logistic Regression)
        </h2>
        <p className="para">
          رگرسیون لجستیک احتمالات مربوط به مسائل طبقه‌بندی با دو خروجی ممکن را مدل‌سازی می‌کند.
          تابع لجستیک برای فشرده کردن خروجی بین ۰ و ۱ استفاده می‌شود:
        </p>

        <div className="math-block-label">تابع لجستیک (سیگموئید)</div>
        <MathBlock>
          logistic(η) = 1 / (1 + exp(-η))
        </MathBlock>

        <p className="para">احتمال تعلق به کلاس ۱ به صورت زیر محاسبه می‌شود:</p>

        <div className="math-block-label">احتمال کلاس مثبت در رگرسیون لجستیک</div>
        <MathBlock>
          P(y=1 | x) = 1 / (1 + exp(-(β₀ + β₁ x₁ + … + βₚ xₚ)))
        </MathBlock>

        <p className="para">
          تفسیر ضرایب در این مدل از طریق لگاریتم شانس (Log-odds) انجام می‌شود:
        </p>

        <div className="math-block-label">لگاریتم شانس (Logit)</div>
        <MathBlock>
          log(P(y=1) / P(y=0)) = β₀ + β₁ x₁ + … + βₚ xₚ
        </MathBlock>

        <div className="info-box teal">
          <span className="info-icon">✓</span>
          <div className="info-content">
            <strong>مزایای رگرسیون لجستیک</strong>
            علاوه بر ارائه‌ی برچسب کلاس، <span className="highlight">احتمال وقوع</span> آن را نیز مشخص می‌کند
            و به راحتی به مسائل چندکلاسه (Multinomial Logistic Regression) تعمیم می‌یابد.
          </div>
        </div>

        {/* 3.3 درخت تصمیم */}
        <h2 id="s3" className="section-heading">
          ۳-۳. درخت تصمیم (Decision Tree)
        </h2>
        <p className="para">
          مدل‌های مبتنی بر درخت، داده‌ها را چندین بار بر اساس مقادیر آستانه مشخصی در ویژگی‌ها
          تقسیم می‌کنند. رابطه خروجی در این مدل‌ها به صورت زیر بیان می‌شود:
        </p>

        <div className="math-block-label">پیش‌بینی در درخت تصمیم</div>
        <MathBlock>
          {`ŷ = f̂(x) = Σₘ cₘ · I{x ∈ Rₘ}`}
        </MathBlock>

        <div className="info-box gold">
          <span className="info-icon">🌳</span>
          <div className="info-content">
            <strong>الگوریتم CART</strong>
            محبوب‌ترین الگوریتم برای استنتاج درخت. از واریانس برای رگرسیون و شاخص جینی (Gini Index)
            برای طبقه‌بندی استفاده می‌کند.
          </div>
        </div>

        <p className="para">
          یکی از مهم‌ترین مزیت‌های تفسیری درخت تصمیم، امکان تجزیه‌ی پیش‌بینی بر اساس هر تقسیم‌بندی
          (split) و یا هر ویژگی است:
        </p>

        <div className="math-block-label">تجزیه درخت (Tree Decomposition)</div>
        <MathBlock>
          f̂(x) = ȳ + Σ_d split.contrib(d, x) = ȳ + Σⱼ feat.contrib(j, x)
        </MathBlock>

        {/* 3.4 قوانین تصمیم */}
        <h2 id="s4" className="section-heading">
          ۳-۴. قوانین تصمیم (Decision Rules)
        </h2>
        <p className="para">
          یک قانون تصمیم، یک گزاره ساده «اگر-آنگاه» (IF-THEN) است. به عنوان مثال:
        </p>

        <div className="info-box violet">
          <span className="info-icon">📋</span>
          <div className="info-content">
            <strong>مثال قانون تصمیم</strong>
            اگر امروز باران می‌بارد AND اگر ماه آوریل است، آنگاه فردا باران خواهد بارید.
          </div>
        </div>

        <p className="para">
          کارایی یک قانون با دو معیار اصلی ارزیابی می‌شود:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "16px 0", maxWidth: 780 }}>
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: 16 }}>
            <div style={{ color: "var(--accent-gold)", fontWeight: 700, marginBottom: 8, fontSize: 14 }}>
              پشتیبانی (Support)
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.7 }}>
              درصد نمونه‌هایی که شرطِ قانون برای آن‌ها صدق می‌کند.
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 10, padding: 16 }}>
            <div style={{ color: "var(--accent-primary)", fontWeight: 700, marginBottom: 8, fontSize: 14 }}>
              دقت (Accuracy / Precision)
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.7 }}>
              در میان نمونه‌هایی که قانون برای آن‌ها اعمال شده، چه درصدی درست پیش‌بینی شده‌اند.
            </div>
          </div>
        </div>

        {/* 3.5 سایر مدل‌ها */}
        <h2 id="s5" className="section-heading">
          ۳-۵. سایر مدل‌های تفسیرپذیر
        </h2>

        <h3 className="subsection-heading">بیز ساده (Naive Bayes Classifier)</h3>
        <p className="para">
          از قضیه بیز برای محاسبه احتمالات شرطی استفاده می‌کند. فرض اصلی این مدل استقلال شرطی
          بین ویژگی‌هاست (البته که در عمل اغلب نادیده گرفته می‌شود):
        </p>

        <div className="math-block-label">قضیه بیز در طبقه‌بند بیز ساده</div>
        <MathBlock>
          P(Cₖ | x) = (1/Z) · P(Cₖ) · Πᵢ P(xᵢ | Cₖ)
        </MathBlock>

        <h3 className="subsection-heading">k همسایه نزدیک (k-Nearest Neighbors - KNN)</h3>
        <p className="para">
          از نزدیک‌ترین همسایه‌های یک نقطه داده برای پیش‌بینی استفاده می‌کند. چالش‌برانگیزترین
          بخش، یافتن مقدار مناسب برای پارامتر k و انتخاب معیار فاصله (مانند فاصله اقلیدسی
          یا منهایکفسکی) است.
        </p>
        <div className="info-box teal">
          <span className="info-icon">🔍</span>
          <div className="info-content">
            <strong>تفسیرپذیری در KNN</strong>
            برخلاف سایر مدل‌های این فصل، KNN در سطح ماژولار قابل تفسیر نیست؛ زیرا پیش‌بینی به صورت
            محلی و بر اساس همسایگی انجام می‌شود. تنها می‌توان به صورت محلی توضیح داد کدام نقاط در
            تصمیم‌گیری دخالت داشته‌اند.
          </div>
        </div>

        <PageFooter
          prev={{ href: "/chapter/2", title: "تفسیرپذیری" }}
          next={{ href: "/chapter/4", title: "روش‌های مستقل از مدل" }}
        />
      </div>
    </DocLayout>
  );
}
