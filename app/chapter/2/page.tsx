"use client";
import type { TocItem } from "@/app/components/TableOfContents";
import DocLayout, { PageFooter } from "@/app/components/DocLayout";

const toc: TocItem[] = [
  { id: "intro", title: "تفسیرپذیری", level: 2 },
  { id: "s1", title: "اهمیت تفسیرپذیری", level: 2 },
  { id: "s2", title: "چه زمانی به تفسیرپذیری نیاز نداریم؟", level: 2 },
  { id: "s3", title: "طبقه‌بندی روش‌های تفسیرپذیری", level: 2 },
  { id: "s4", title: "محدوده تفسیرپذیری", level: 2 },
  { id: "s5", title: "ارزیابی تفسیرپذیری", level: 2 },
  { id: "s6", title: "ویژگی‌های توضیحات", level: 2 },
];

export default function Chapter2() {
  return (
    <DocLayout
      toc={toc}
      prev={{ href: "/chapter/1", title: "مقدمه" }}
      next={{ href: "/chapter/3", title: "مدل‌های تفسیرپذیر" }}
    >
      <div>
        <div className="chapter-eyebrow" style={{ background: "#F5F3FF", color: "#7C3AED" }}>
          فصل دوم
        </div>
        <h1 id="intro" className="chapter-title" style={{ scrollMarginTop: 80 }}>
          تفسیرپذیری
        </h1>
        <p className="chapter-lead">
          در این فصل با مفهوم تفسیرپذیری، اهمیت آن، سناریوهایی که نیازی به آن نداریم،
          طبقه‌بندی روش‌های مختلف، محدوده‌های تحلیل، روش‌های ارزیابی و در نهایت ویژگی‌های
          یک توضیح مطلوب آشنا می‌شویم.
        </p>

        <p className="para">
          هیچ تعریف ریاضی دقیقی برای <span className="term-inline">تفسیرپذیری</span> وجود ندارد.
          یک تعریف (غیر ریاضی) از میلر است:
        </p>

        <div className="info-box violet">
          <span className="info-icon">💬</span>
          <div className="info-content">
            <strong>تعریف میلر (۲۰۱۷)</strong>
            تفسیرپذیری میزانی است که یک انسان می‌تواند علت یک تصمیم را درک کند.
          </div>
        </div>

        <p className="para">
          تعریف دیگر این است: تفسیرپذیری میزانی است که یک انسان می‌تواند نتیجه مدل را به طور
          مداوم و سازگار پیش‌بینی کند. هرچه تفسیرپذیری یک مدل یادگیری ماشین بالاتر باشد،
          درک اینکه چرا تصمیمات یا پیش‌بینی‌های خاصی انجام شده است برای افراد آسان‌تر خواهد بود.
          یک مدل زمانی بهتر از مدل دیگر تفسیرپذیر است که درک تصمیمات آن برای انسان نسبت به
          مدل دیگر آسان‌تر باشد.
        </p>

        {/* 2.1 اهمیت تفسیرپذیری */}
        <h2 id="s1" className="section-heading">
          ۲-۱. اهمیت تفسیرپذیری
        </h2>
        <p className="para">
          اگر یک مدل یادگیری ماشین عملکرد خوبی دارد، چرا فقط به آن اعتماد نکنیم و اینکه چرا
          چنین تصمیمی گرفته است را نادیده نگیریم؟
        </p>
        <p className="para">
          دوشی-ولز و همکاران بیان می‌کنند که مشکل این است که یک معیار واحد، مانند دقت
          دسته‌بندی، توصیف ناقصی از اکثر وظایف در دنیای واقعی است. وقتی صحبت از مدل‌سازی
          پیش‌بینانه می‌شود، شما باید یک مصالحه (Trade-off) انجام دهید. آیا فقط می‌خواهید
          بدانید چه چیزی پیش‌بینی شده است؟ یا اینکه می‌خواهید بدانید چرا پیش‌بینی انجام شده و
          احتمالاً هزینه این تفسیرپذیری را با کاهش عملکردِ پیش‌بینی بپردازید؟
        </p>
        <p className="para">
          در برخی موارد، برای شما مهم نیست که چرا تصمیمی گرفته شده است؛ اما در موارد دیگر،
          دانستن چرایی می‌تواند به شما کمک کند تا درباره مسئله، داده‌ها و دلیل شکست احتمالی
          مدل بیشتر بیاموزید.
        </p>

        <p className="para">
          دلایل متعددی تقاضا برای تفسیرپذیری و توضیحات را هدایت می‌کنند:
        </p>

        <ul className="styled-list">
          <li>
            از منظر <span className="highlight">کنجکاوی و یادگیری</span>: انسان‌ها مدل ذهنی
            مختص به خود را از محیط دارند که با وقوع اتفاقات غیرمنتظره و یافتن توضیحی برای آن‌ها
            به‌روز می‌شود.
          </li>
          <li>
            در راستای <span className="highlight">یافتن معنا در جهان</span>: ما همواره می‌خواهیم
            تضادها یا ناسازگاری‌های بین ساختارهای دانش خود را هماهنگ کنیم؛ بر این اساس، هرچه
            تصمیم یک ماشین بیشتر بر زندگی یک فرد تأثیر بگذارد، اهمیت توضیح رفتار آن ماشین
            نیز بیشتر می‌شود.
          </li>
          <li>
            در بسیاری از رشته‌های علمی که با کلان‌داده‌ها سروکار دارند، مدل به جای داده‌ها به
            منبع دانش تبدیل می‌شود و تفسیرپذیری استخراج این دانشِ نهفته را ممکن می‌سازد.
          </li>
        </ul>

        <div className="info-box gold">
          <span className="info-icon">🛡️</span>
          <div className="info-content">
            <strong>ایمنی، انصاف و شفافیت</strong>
            مدل‌های یادگیری ماشین امروزه وظایفی را بر عهده می‌گیرند که نیازمند اقدامات
            ایمنی و تست هستند (نظیر خودروهای خودران) تا از بروز فجایع جلوگیری شود. از آنجا که
            این مدل‌ها ممکن است سوگیری‌هایی (Bias) را از داده‌های آموزشی بیاموزند، تفسیرپذیری
            به عنوان یک ابزار خطایابی کارآمد برای تشخیص تبعیض عمل می‌کند. در نهایت، فرآیند
            ادغام ماشین‌ها در زندگی روزمره ما، برای افزایش پذیرش اجتماعی و همچنین تسهیل
            فرآیند دیباگ و حسابرسی، نیازمند شفافیت است.
          </div>
        </div>

        <p className="para">
          اگر اطمینان حاصل کنید که مدل می‌تواند تصمیمات خود را توضیح دهد، بررسی ویژگی‌هایی
          مانند انصاف (Fairness)، حفظ حریم خصوصی (Privacy)، قابلیت اطمینان یا استواری
          (Robustness)، کشف روابط علی (Causality) و در نهایت جلب اعتماد (Trust) کاربران
          بسیار آسان‌تر خواهد شد.
        </p>

        {/* 2.2 چه زمانی نیاز نداریم؟ */}
        <h2 id="s2" className="section-heading">
          ۲-۲. چه زمانی به تفسیرپذیری نیاز نداریم؟
        </h2>
        <p className="para">
          با وجود اهمیت فراوان تفسیرپذیری، در سناریوهایی خاص نیازی به آن نداریم. به عنوان
          مثال، موارد زیر را در نظر بگیرید:
        </p>

        <ul className="styled-list">
          <li>
            زمانی که مدل تأثیر قابل‌توجهی بر ابعاد مالی یا اجتماعی انسان‌ها ندارد و خطای آن
            صرفاً برای سازنده کمی خجالت‌آور است، نیازی به درک چراییِ خروجی مدل احساس نمی‌شود.
          </li>
          <li>
            در کاربردهایی که پیش‌تر به اندازه کافی مطالعه شده‌اند و سال‌ها تجربه عملی موفق
            پشت آن‌هاست (نظیر سیستم‌های تشخیص نوری نویسه‌ها)، ضرورتی برای استخراج بینش‌های
            اضافی وجود ندارد.
          </li>
          <li>
            افزون بر این، در سیستم‌هایی که در آن‌ها اهداف سازندگان با منافع کاربران در تضاد
            است (مانند سیستم‌های امتیازدهی اعتباری بانک‌ها)، تفسیرپذیریِ بالا می‌تواند نقطه
            ضعف محسوب شود؛ چرا که به افراد آگاه امکان می‌دهد تا با فریب دادن و دستکاری عمدی
            ورودی‌ها، سیستم را دور بزنند.
          </li>
        </ul>

        {/* 2.3 طبقه‌بندی روش‌ها */}
        <h2 id="s3" className="section-heading">
          ۲-۳. طبقه‌بندی روش‌های تفسیرپذیری
        </h2>
        <p className="para">
          روش‌های تفسیرپذیری یادگیری ماشین را می‌توان بر اساس معیارهای مختلفی طبقه‌بندی کرد.
          چهار معیار اصلی در ادامه آمده‌اند:
        </p>

        <div className="info-box violet">
          <span className="info-icon">◈</span>
          <div className="info-content">
            <strong>۱. ذاتی یا پسینی (Intrinsic or Post Hoc)</strong>
            نخستین معیار، تفاوت میان روش‌های ذاتی و پسینی است؛ به این معنا که آیا
            تفسیرپذیری با محدود کردن پیچیدگی خود مدل (مانند یک درخت تصمیم کوتاه) به دست
            می‌آید یا با اعمال روش‌هایی برای تحلیل یک مدل از پیش آموزش‌دیده.
          </div>
        </div>

        <div className="info-box gold">
          <span className="info-icon">◈</span>
          <div className="info-content">
            <strong>۲. خروجی روش تفسیر</strong>
            معیار دوم به خروجیِ روش تفسیر اشاره دارد که می‌تواند شامل ارائه آمار خلاصه برای
            هر ویژگی، تجسم بصری این خلاصه‌ها، نمایش اجزای داخلی مدل نظیر وزن‌ها، تولید و
            معرفی نقاط داده جدید برای توجیه پیش‌بینی، و در نهایت تقریب زدن با یک مدل کاملاً
            تفسیرپذیر باشد.
          </div>
        </div>

        <div className="info-box teal">
          <span className="info-icon">◈</span>
          <div className="info-content">
            <strong>۳. وابسته یا مستقل از مدل (Model-specific or Agnostic)</strong>
            معیار سوم بررسی می‌کند که آیا روش مورد نظر منحصراً برای یک کلاس مدل خاص طراحی
            شده است یا به صورت مستقل از مدل عمل می‌کند.
          </div>
        </div>

        <div className="info-box violet">
          <span className="info-icon">◈</span>
          <div className="info-content">
            <strong>۴. محلی یا سراسری (Local or Global)</strong>
            معیار چهارم و نهایی محلی یا سراسری بودن تفسیرپذیری است؛ یعنی مشخص می‌کند که
            آیا روشِ ارائه‌شده تنها یک پیش‌بینی منفرد را توضیح می‌دهد یا رفتار کلی مدل را در بر
            می‌گیرد.
          </div>
        </div>

        {/* 2.4 محدوده تفسیرپذیری */}
        <h2 id="s4" className="section-heading">
          ۲-۴. محدوده تفسیرپذیری
        </h2>
        <p className="para">
          فرآیند تفسیرپذیری در سطوح و محدوده‌های مختلفی قابل تحلیل است. پنج سطح اصلی از
          کلی‌ترین به خردترین در لیست زیر آمده‌اند:
        </p>

        <div className="levels-list">
          <div className="level-item">
            <div className="level-num">سطح ۱</div>
            <div>
              <div className="level-content-title">شفافیت الگوریتم</div>
              <div className="level-content-desc">
                در عام‌ترین سطح، شفافیت الگوریتم مطرح است که بررسی می‌کند الگوریتم چگونه مدل
                را از روی داده‌ها یاد می‌گیرد، بی‌آنکه وارد جزئیات پیش‌بینی نهایی شود.
              </div>
            </div>
          </div>

          <div className="level-item">
            <div className="level-num">سطح ۲</div>
            <div>
              <div className="level-content-title">تفسیرپذیری سراسری و جامع مدل</div>
              <div className="level-content-desc">
                تلاش می‌کند نحوه تصمیم‌گیری مدلِ آموزش‌دیده را به طور یکپارچه توضیح دهد؛ هدفی
                که در مدل‌های پیچیده عملاً فراتر از توان انسان است.
              </div>
            </div>
          </div>

          <div className="level-item">
            <div className="level-num">سطح ۳</div>
            <div>
              <div className="level-content-title">تفسیرپذیری سراسری در سطح ماژولار</div>
              <div className="level-content-desc">
                سطح واقع‌بینانه‌تر، تفسیرپذیری سراسری در سطح ماژولار است که نشان می‌دهد بخش‌ها
                و اجزای خاصی از مدل (نظیر تک‌تک وزن‌ها در مدل خطی) چگونه بر پیش‌بینی‌ها تأثیر
                می‌گذارند.
              </div>
            </div>
          </div>

          <div className="level-item">
            <div className="level-num">سطح ۴</div>
            <div>
              <div className="level-content-title">تفسیرپذیری محلی برای یک پیش‌بینی واحد</div>
              <div className="level-content-desc">
                در خردترین سطوح، تفسیرپذیری محلی برای یک پیش‌بینی واحد به ما اجازه می‌دهد روی
                یک نمونه خاص متمرکز شده و چراییِ پیش‌بینی آن را بررسی کنیم.
              </div>
            </div>
          </div>

          <div className="level-item">
            <div className="level-num">سطح ۵</div>
            <div>
              <div className="level-content-title">تفسیرپذیری محلی برای گروهی از پیش‌بینی‌ها</div>
              <div className="level-content-desc">
                با بسط دادن همین مفهوم می‌توان به تفسیرپذیری محلی برای گروهی از پیش‌بینی‌ها
                دست یافت که منطق تصمیم‌گیری مدل را برای زیرمجموعه خاصی از داده‌ها روشن می‌سازد.
              </div>
            </div>
          </div>
        </div>

        {/* 2.5 ارزیابی تفسیرپذیری */}
        <h2 id="s5" className="section-heading">
          ۲-۵. ارزیابی تفسیرپذیری
        </h2>
        <p className="para">
          گرچه توافق قطعی در مورد چیستی تفسیرپذیری و نحوه دقیق سنجش آن وجود ندارد، اما
          دوشی-ولز و کیم سه سطح اصلی را برای ارزیابی آن پیشنهاد داده‌اند:
        </p>

        <div className="info-box gold">
          <span className="info-icon">🏥</span>
          <div className="info-content">
            <strong>۱. ارزیابی در سطح کاربرد (Application Level)</strong>
            توضیحِ تولید شده در دل یک نرم‌افزار کاربردی گنجانده شده و مستقیماً توسط متخصصان
            آن حوزه (مانند رادیولوژیست‌ها) ارزیابی می‌شود.
          </div>
        </div>

        <div className="info-box violet">
          <span className="info-icon">👤</span>
          <div className="info-content">
            <strong>۲. ارزیابی در سطح انسان (Human Level)</strong>
            نسخه‌ای ساده‌شده از رویکرد پیشین است؛ با این تفاوت که وظایف به جای متخصصان، توسط
            افراد عادی سنجیده می‌شوند تا هزینه و زمان آزمایش کاهش یابد.
          </div>
        </div>

        <div className="info-box teal">
          <span className="info-icon">⚙️</span>
          <div className="info-content">
            <strong>۳. ارزیابی در سطح عملکرد (Function Level)</strong>
            مستقل از آزمایش انسانی انجام می‌شود و در آن از معیارهای جانشین (پروکسی) مانند عمق
            یک درخت تصمیم، به عنوان شاخصی برای سنجش کیفیت و سهولت فهم توضیحات استفاده
            می‌گردد.
          </div>
        </div>

        {/* 2.6 ویژگی‌های توضیحات */}
        <h2 id="s6" className="section-heading">
          ۲-۶. ویژگی‌های توضیحات
        </h2>
        <p className="para">
          برای ارزیابی و سنجش میزان کیفیت یک روشِ توضیح و همچنین خروجی آن، از مجموعه‌ای از
          ویژگی‌های بنیادین استفاده می‌شود. این ویژگی‌ها در دو دسته «ویژگی‌های روش» و
          «ویژگی‌های خود توضیح» طبقه‌بندی می‌شوند:
        </p>

        <h3 className="subsection-heading">ویژگی‌های روش‌های توضیح</h3>
        <ul className="styled-list">
          <li>
            <strong>قدرت بیان:</strong> نوع ساختار توضیحات (قواعد شرطی، درخت تصمیم و غیره) را تعیین می‌کند.
          </li>
          <li>
            <strong>شفافیت درونی:</strong> وابستگی روش به بررسی درون جعبه سیاه مدل را می‌سنجد.
          </li>
          <li>
            <strong>قابلیت جابجایی (Portability):</strong> میزان کارکرد روش روی مدل‌های مختلف را ارزیابی می‌کند.
          </li>
          <li>
            <strong>پیچیدگی الگوریتمی:</strong> هزینه و زمان محاسباتی برای تولید توضیحات را مشخص می‌کند.
          </li>
        </ul>

        <h3 className="subsection-heading">ویژگی‌های خود توضیح</h3>

        <div className="feature-grid">
          <div className="feature-item">
            <span className="feature-item-bullet" />
            <span><strong>دقت (Accuracy)</strong> — میزان کارایی توضیح روی نمونه‌های جدید</span>
          </div>
          <div className="feature-item">
            <span className="feature-item-bullet" />
            <span><strong>وفاداری (Fidelity)</strong> — میزان تقریب رفتار واقعی مدل جعبه سیاه</span>
          </div>
          <div className="feature-item">
            <span className="feature-item-bullet" />
            <span><strong>سازگاری</strong> — ثبات توضیحات در بین مدل‌های مشابه</span>
          </div>
          <div className="feature-item">
            <span className="feature-item-bullet" />
            <span><strong>پایداری</strong> — عدم تغییر شدید توضیح با تغییرات جزئی ورودی</span>
          </div>
          <div className="feature-item">
            <span className="feature-item-bullet" />
            <span><strong>قابلیت درک توسط انسان</strong> — سهولت فهم توسط کاربر نهایی</span>
          </div>
          <div className="feature-item">
            <span className="feature-item-bullet" />
            <span><strong>قطعیت مدل</strong> — میزان اطمینان توضیح به تصمیم</span>
          </div>
          <div className="feature-item">
            <span className="feature-item-bullet" />
            <span><strong>بیان درجه اهمیت</strong> — نمایش صحیح وزن هر ویژگی</span>
          </div>
          <div className="feature-item">
            <span className="feature-item-bullet" />
            <span><strong>پوشش یا نمایندگی</strong> — گسترش توضیح برای سایر نمونه‌ها</span>
          </div>
        </div>

        <PageFooter
          prev={{ href: "/chapter/1", title: "مقدمه" }}
          next={{ href: "/chapter/3", title: "مدل‌های تفسیرپذیر" }}
        />
      </div>
    </DocLayout>
  );
}
