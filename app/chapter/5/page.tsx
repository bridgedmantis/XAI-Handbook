"use client";

import type { TocItem } from "@/app/components/TableOfContents";
import DocLayout, { PageFooter } from "@/app/components/DocLayout";
import MathBlock from "@/app/components/MathBlock";
import Figure from "@/app/components/Figure";


const toc: TocItem[] = [
  { id: "example-based", title: "توضیحات مبتنی بر نمونه", level: 2 },
  { id: "prototype-criticism", title: "نمونه‌های اولیه و استثناها (Prototypes and Criticisms)", level: 2 },
  { id: "counterfactual", title: "توضیحات خلاف‌واقع (Counterfactual Explanations)", level: 2 },
  { id: "adversarial", title: "نمونه‌های متخاصم (Adversarial Examples)", level: 2 },
];


export default function Chapter5() {
  return (
    <DocLayout toc={toc}>


      {/* Example Based Explanation */}

      <div className="chapter-eyebrow" style={{ background: "#ECFDF5", color: "#059669" }}>
          فصل ۵
        </div>
        <h1 id="intro" className="chapter-title" style={{ scrollMarginTop: 80 }}>
          توضیحات مبتنی بر نمونه
        </h1>


      <p className="para">

        روش‌های توضیح مبتنی بر نمونه، به جای استخراج قوانین پیچیده از مدل،
        از نمونه‌های واقعی داده برای توضیح رفتار مدل استفاده می‌کنند.
        ایده اصلی این روش‌ها انتخاب نقاطی از داده است که بتوانند رفتار مدل
        یا ساختار داده را برای انسان قابل درک کنند.

      </p>



      {/* Prototypes and Criticisms */}

      <h2
        id="prototype-criticism"
        className="section-heading"
      >
        نمونه‌های اولیه و استثناها (Prototypes and Criticisms)
      </h2>



      <p className="para">

        یک
        <span className="term-inline">
          Prototype
        </span>
        (
        نمونه اولیه
        )
        نقطه‌ای از داده است که می‌تواند نماینده بخش بزرگی از مجموعه داده باشد.
        این نقاط معمولاً ویژگی‌های اصلی توزیع داده را نمایش می‌دهند.

      </p>



      <p className="para">

        در مقابل،
        <span className="term-inline">
          Criticism
        </span>
        (
        استثنا
        )
        نقطه‌ای است که توسط نمونه‌های اولیه انتخاب‌شده به خوبی توضیح داده نمی‌شود.
        هدف از یافتن Criticismها، شناسایی بخش‌هایی از داده است که ممکن است
        اطلاعات مهم یا رفتار غیرمعمول مدل را نشان دهند.

      </p>




      <div className="info-box teal">

        <span className="info-icon">
          💡
        </span>


        <div className="info-content">

          <strong>
            ایده اصلی
          </strong>

          <p>
            Prototypeها نمونه‌های نماینده داده هستند،
            در حالی که Criticismها نقاطی هستند که توسط این نمونه‌های نماینده
            پوشش داده نشده‌اند و اطلاعات مکملی ارائه می‌کنند.
          </p>


        </div>

      </div>




      <p className="para">

        مفهوم
        <span className="term-inline">
          Data point
        </span>
        برای اشاره به یک نمونه منفرد استفاده می‌شود.
        هر نقطه داده را می‌توان به صورت یک نقطه در فضای چندبعدی در نظر گرفت
        که هر ویژگی یک بعد از این فضا را تشکیل می‌دهد.

      </p>




      <h3 className="subsection-heading">

        روش‌های یافتن Prototype

      </h3>




      <p className="para">

        روش‌های مختلفی برای یافتن نمونه‌های اولیه وجود دارد.
        یکی از روش‌های متداول، الگوریتم
        <span className="term-inline">
          k-medoids
        </span>
        است که مشابه الگوریتم
        <span className="term-inline">
          k-means
        </span>
        عمل می‌کند.

        تفاوت اصلی این است که مرکز خوشه در k-medoids الزاماً یک نقطه واقعی
        از داده‌ها است.

      </p>




      <p className="para">

        به طور کلی، هر الگوریتم خوشه‌بندی که بتواند نقاط واقعی داده را
        به عنوان مرکز خوشه انتخاب کند، می‌تواند برای یافتن Prototypeها استفاده شود.
        با این حال، بیشتر این روش‌ها فقط Prototype پیدا می‌کنند و قادر به
        شناسایی Criticismها نیستند.

      </p>




      <h3 className="subsection-heading">

        روش MMD-Critic

      </h3>




      <p className="para">

        روش
        <span className="term-inline">
          MMD-Critic
        </span>
        که توسط Kim و همکاران معرفی شد،
        یک چارچوب واحد برای یافتن Prototype و Criticism ارائه می‌کند.

        این روش تلاش می‌کند توزیع داده اصلی را با توزیع Prototypeهای انتخاب‌شده
        مقایسه کرده و اختلاف میان آن‌ها را کاهش دهد.

      </p>




      <div className="math-block-label">

        Maximum Mean Discrepancy (MMD)

      </div>



      <MathBlock>

{`
MMD^2 =
\\frac{1}{m^2}
\\sum_{i,j=1}^{m} k(z_i,z_j)
-
\\frac{2}{mn}
\\sum_{i=1}^{m}
\\sum_{j=1}^{n}
k(z_i,x_j)
+
\\frac{1}{n^2}
\\sum_{i,j=1}^{n}
k(x_i,x_j)
`}

      </MathBlock>




      <p className="para">

        در این رابطه:

      </p>




      <ul className="list">

        <li>
          <span className="term-inline">
            k
          </span>
          تابع هسته برای اندازه‌گیری شباهت بین دو نقطه است.
        </li>


        <li>
          <span className="term-inline">
            z
          </span>
          نمونه‌های اولیه انتخاب‌شده هستند.
        </li>


        <li>
          <span className="term-inline">
            x
          </span>
          تمام نقاط داده موجود در مجموعه داده هستند.
        </li>


        <li>
          هدف الگوریتم کمینه کردن مقدار MMD² و نزدیک کردن توزیع Prototypeها
          به توزیع اصلی داده است.
        </li>


      </ul>




      <h3 className="subsection-heading">

        تابع هسته RBF

      </h3>




      <p className="para">

        یکی از توابع هسته پرکاربرد در این روش،
        هسته تابع پایه شعاعی
        (
        <span className="term-inline">
          Radial Basis Function Kernel
        </span>
        )
        است.

      </p>




      <MathBlock>

{`
k(x,x')
=
\\exp(-\\gamma ||x-x'||^2)
`}

      </MathBlock>




      <p className="para">

        در این رابطه،
        فاصله اقلیدسی بین دو نقطه توسط
        <span className="term-inline">
          ||x-x'||²
        </span>
        نشان داده می‌شود و
        γ
        پارامتر مقیاس تابع هسته است.

      </p>

      <h3 className="subsection-heading">

        یافتن Criticism و تابع Witness

      </h3>



      <p className="para">

        برای یافتن استثناها، نیاز به ابزاری به نام
        <span className="term-inline">
          Witness Function
        </span>
        داریم.
        این تابع اختلاف میان تخمین چگالی داده اصلی و تخمین چگالی
        نمونه‌های اولیه را در هر نقطه اندازه‌گیری می‌کند.

      </p>




      <MathBlock>

{`
\\text{witness}(x)
=
\\frac{1}{n}
\\sum_{i=1}^{n}
k(x,x_i)
-
\\frac{1}{m}
\\sum_{j=1}^{m}
k(x,z_j)
`}

      </MathBlock>




      <p className="para">

        اگر مقدار تابع Witness برای یک نقطه نزدیک به صفر باشد،
        نشان‌دهنده آن است که Prototypeها توزیع داده را در آن ناحیه
        به خوبی پوشش داده‌اند.

        اما مقادیر بسیار مثبت یا منفی نشان‌دهنده مناطقی هستند که
        نمایش Prototypeها با داده اصلی اختلاف زیادی دارد.

      </p>




      <div className="info-box gold">

        <span className="info-icon">
          ⚠️
        </span>


        <div className="info-content">

          <strong>
            انتخاب Criticism
          </strong>


          <p>

            Criticismها معمولاً نقاطی هستند که بیشترین اختلاف را
            بین توزیع داده و توزیع Prototypeها نشان می‌دهند.
            این نقاط می‌توانند نمونه‌هایی از خطاهای مدل،
            داده‌های نادر یا رفتارهای غیرمنتظره باشند.

          </p>


        </div>

      </div>





      <h3 className="subsection-heading">

        کاربردهای MMD-Critic در یادگیری ماشین تفسیرپذیر

      </h3>




      <p className="para">

        الگوریتم MMD-Critic از چند طریق به افزایش قابلیت تفسیر مدل‌های
        یادگیری ماشین کمک می‌کند.

      </p>




      <ul className="list">

        <li>

          <strong>
            درک توزیع داده:
          </strong>

          <br />

          Prototypeها یک خلاصه قابل فهم از ساختار کلی داده ارائه می‌کنند
          و برای توزیع‌های پیچیده بسیار مفید هستند.

        </li>



        <li>

          <strong>
            ایجاد مدل‌های تفسیرپذیر:
          </strong>

          <br />

          در مدل‌های مبتنی بر Prototype،
          پیش‌بینی می‌تواند تنها بر اساس نزدیک‌ترین نمونه اولیه انجام شود.

        </li>



        <li>

          <strong>
            تحلیل مدل‌های جعبه سیاه:
          </strong>

          <br />

          با بررسی پیش‌بینی مدل برای Prototypeها و Criticismها،
          می‌توان نقاط ضعف یا سوگیری‌های پنهان مدل را شناسایی کرد.

        </li>


      </ul>




      <MathBlock>

{`
\\hat{f}(x)
=
\\arg\\max_{i \\in S}
k(x,x_i)
`}

      </MathBlock>




      <p className="para">

        این ویژگی باعث می‌شود MMD-Critic به عنوان یک ابزار
        <span className="term-inline">
          Sanity Check
        </span>
        برای بررسی رفتار مدل‌های پیچیده مورد استفاده قرار گیرد.

        به جای بررسی تمام داده‌های آموزشی، می‌توان چند نمونه کلیدی را
        تحلیل کرد و مشکلات مدل را آشکار ساخت.

      </p>





      {/* Counterfactual */}

      <h2
        id="counterfactual"
        className="section-heading"
      >

        توضیحات خلاف‌واقع (Counterfactual Explanations)

      </h2>




      <p className="para">

        یک توضیح خلاف‌واقع، سناریویی فرضی را بیان می‌کند که در آن
        با تغییر شرایط اولیه، نتیجه متفاوتی رخ می‌دهد.

        به بیان ساده:

      </p>




      <div className="info-box teal">

        <span className="info-icon">
          💡
        </span>


        <div className="info-content">


          <strong>
            مفهوم خلاف‌واقع
          </strong>


          <p>

            اگر X تغییر می‌کرد، آیا Y نیز تغییر می‌کرد؟

            برای مثال:
            اگر قهوه داغ نمی‌نوشیدم، زبانم نمی‌سوخت.

          </p>


        </div>


      </div>





      <p className="para">

        در یادگیری ماشین تفسیرپذیر، هدف از توضیحات خلاف‌واقع این است
        که مشخص شود چه تغییر کوچکی در ویژگی‌های ورودی باعث تغییر
        خروجی مدل می‌شود.

      </p>




      <p className="para">

        برای مثال، اگر یک مدل درخواست وام را رد کند،
        توضیح خلاف‌واقع می‌تواند مشخص کند که چه تغییراتی در ویژگی‌ها
        باعث تأیید درخواست می‌شده است.

      </p>




      <p className="para">

        این روش کاملاً مستقل از مدل
        (
        <span className="term-inline">
          Model-agnostic
        </span>
        )
        است، زیرا تنها به ورودی و خروجی مدل نیاز دارد
        و نیازی به دانستن ساختار داخلی مدل ندارد.

      </p>




      <h3 className="subsection-heading">

        ویژگی‌های یک توضیح خلاف‌واقع مطلوب

      </h3>




      <p className="para">

        یک توضیح خلاف‌واقع مناسب باید چند ویژگی مهم داشته باشد:

      </p>




      <ul className="list">


        <li>

          باید بتواند خروجی مطلوب مدل را با دقت ایجاد کند.

        </li>


        <li>

          باید کمترین تغییر ممکن را نسبت به نمونه اصلی داشته باشد.

        </li>


        <li>

          باید از نظر دنیای واقعی معتبر و قابل قبول باشد.

        </li>


      </ul>




      <p className="para">

        یکی از چالش‌های مهم این روش،
        <span className="term-inline">
          Rashomon Effect
        </span>
        است.

        یعنی ممکن است برای یک پیش‌بینی، چندین توضیح خلاف‌واقع متفاوت
        وجود داشته باشد که همه آن‌ها معتبر باشند.

      </p>




      <h3 className="subsection-heading">

        تولید توضیحات خلاف‌واقع

      </h3>




      <p className="para">

        روش Wachter و همکاران یک روش بهینه‌سازی برای تولید
        توضیحات خلاف‌واقع پیشنهاد کردند.

        در این روش، نمونه جدیدی پیدا می‌شود که هم خروجی مطلوب را تولید کند
        و هم کمترین فاصله را با نمونه اصلی داشته باشد.

      </p>




      <MathBlock>

{`
L(x,x',y',\\lambda)
=
\\lambda(\\hat{f}(x')-y')^2
+
d(x,x')
`}

      </MathBlock>




      <p className="para">

        جمله اول میزان اختلاف پیش‌بینی نمونه خلاف‌واقع با خروجی هدف را
        نشان می‌دهد.

        جمله دوم فاصله نمونه جدید از نمونه اصلی است.

        پارامتر λ تعادل بین این دو هدف را کنترل می‌کند.

      </p>




      <MathBlock>

{`
|\\hat{f}(x')-y'|
\\leq
\\epsilon
`}

      </MathBlock>




      <p className="para">

        در این روش به جای تعیین مستقیم λ،
        معمولاً یک مقدار تحمل
        (
        <span className="term-inline">
          Tolerance
        </span>
        )
        برای میزان خطای قابل قبول تعریف می‌شود.

      </p>
      <h3 className="subsection-heading">

        معیار فاصله در توضیحات خلاف‌واقع

      </h3>




      <p className="para">

        برای اندازه‌گیری شباهت میان نمونه اصلی و نمونه خلاف‌واقع،
        معمولاً از فاصله منهتن
        (
        <span className="term-inline">
          Manhattan Distance
        </span>
        )
        استفاده می‌شود.

        برای جلوگیری از تأثیر متفاوت مقیاس ویژگی‌ها،
        این فاصله با استفاده از
        <span className="term-inline">
          Median Absolute Deviation (MAD)
        </span>
        وزن‌دهی می‌شود.

      </p>




      <MathBlock>

{`
d(x,x')
=
\\sum_{j=1}^{p}
\\frac{|x_j-x'_j|}
{MAD_j}
`}

      </MathBlock>




      <MathBlock>

{`
MAD_j
=
median_i
(
|x_{i,j}-median(x_j)|
)
`}

      </MathBlock>




      <p className="para">

        استفاده از MAD باعث می‌شود ویژگی‌هایی که پراکندگی بیشتری دارند
        اثر نامتناسبی بر فاصله نداشته باشند و روش نسبت به داده‌های پرت
        مقاوم‌تر شود.

      </p>




      <h3 className="subsection-heading">

        مثال‌های کاربردی Counterfactual

      </h3>




      <p className="para">

        در مطالعه Wachter و همکاران،
        از توضیحات خلاف‌واقع برای تحلیل چند مدل شبکه عصبی استفاده شد.

        در یک مثال، مدلی برای پیش‌بینی عملکرد دانشجویان حقوق بر اساس
        ویژگی‌هایی مانند
        <span className="term-inline">
          GPA
        </span>
        و
        <span className="term-inline">
          LSAT
        </span>
        آموزش داده شد.

      </p>




      <p className="para">

        نتایج نشان داد که برای برخی نمونه‌ها، تغییر ویژگی
        <span className="term-inline">
          Race
        </span>
        باعث تغییر خروجی مدل می‌شد.
        این موضوع وجود سوگیری بالقوه در مدل را آشکار کرد.

      </p>




      <div className="table-wrapper">

      <table className="content-table">

        <thead>

          <tr>

            <th>
              Score
            </th>

            <th>
              GPA
            </th>

            <th>
              LSAT
            </th>

            <th>
              RACE
            </th>

            <th>
              GPA x'
            </th>

            <th>
              LSAT x'
            </th>

            <th>
              RACE x'
            </th>


          </tr>

        </thead>


        <tbody>


          <tr>
            <td>0.17</td>
            <td>3.1</td>
            <td>39.0</td>
            <td>0</td>
            <td>3.1</td>
            <td>34.0</td>
            <td>0</td>
          </tr>


          <tr>
            <td>0.54</td>
            <td>3.7</td>
            <td>48.0</td>
            <td>0</td>
            <td>3.7</td>
            <td>32.4</td>
            <td>0</td>
          </tr>


          <tr>
            <td>-0.77</td>
            <td>3.3</td>
            <td>28.0</td>
            <td>1</td>
            <td>3.3</td>
            <td>33.5</td>
            <td>0</td>
          </tr>


          <tr>
            <td>-0.83</td>
            <td>2.4</td>
            <td>28.5</td>
            <td>1</td>
            <td>2.4</td>
            <td>35.8</td>
            <td>0</td>
          </tr>


        </tbody>


      </table>

      </div>




      <p className="para">

        در مثال دیگری، یک شبکه عصبی برای پیش‌بینی خطر دیابت استفاده شد.
        توضیحات خلاف‌واقع توانستند تغییرات مشخصی در ویژگی‌های پزشکی
        پیشنهاد دهند تا امتیاز خطر به مقدار هدف برسد.

      </p>





      <h3 className="subsection-heading">

        مزایا و معایب Counterfactual

      </h3>




      <div className="info-box teal">


        <span className="info-icon">
          ✅
        </span>


        <div className="info-content">

          <strong>
            مزایا
          </strong>


          <ul className="list">

            <li>
              توضیح ساده و قابل فهم برای کاربران ارائه می‌دهد.
            </li>

            <li>
              به ساختار داخلی مدل نیاز ندارد.
            </li>

            <li>
              حتی برای مدل‌های تجاری از طریق API قابل استفاده است.
            </li>

            <li>
              برای مدل‌های مبتنی بر قانون نیز قابل استفاده است.
            </li>

          </ul>


        </div>


      </div>




      <div className="info-box gold">


        <span className="info-icon">
          ⚠️
        </span>


        <div className="info-content">


          <strong>
            محدودیت‌ها
          </strong>


          <ul className="list">


            <li>
              ممکن است چندین توضیح خلاف‌واقع متفاوت برای یک نمونه وجود داشته باشد.
            </li>


            <li>
              تضمینی برای یافتن جواب مناسب در همه شرایط وجود ندارد.
            </li>


            <li>
              مدیریت ویژگی‌های طبقه‌ای با تعداد زیاد حالت‌ها دشوار است.
            </li>


            <li>
              انفجار ترکیبیاتی در جستجوی حالت‌های ممکن رخ می‌دهد.
            </li>


          </ul>


        </div>


      </div>






      {/* Adversarial Examples */}

      <h2
        id="adversarial"
        className="section-heading"
      >

        نمونه‌های متخاصم (Adversarial Examples)

      </h2>




      <p className="para">

        نمونه متخاصم، داده‌ای است که با اعمال تغییرات بسیار کوچک و هدفمند
        ایجاد می‌شود تا مدل یادگیری ماشین را فریب دهد.

        برخلاف توضیحات خلاف‌واقع که هدف آن‌ها فهم رفتار مدل است،
        هدف نمونه‌های متخاصم ایجاد خطا در مدل است.

      </p>




      <div className="info-box red">


        <span className="info-icon">
          🚨
        </span>


        <div className="info-content">


          <strong>
            تفاوت اصلی
          </strong>


          <p>

            Counterfactual:
            توضیح اینکه چرا مدل چنین تصمیمی گرفته است.

            <br />

            Adversarial:
            تغییر ورودی برای مجبور کردن مدل به تصمیم اشتباه.

          </p>


        </div>


      </div>




      <p className="para">

        این حملات پیامدهای امنیتی مهمی دارند.
        برای مثال، تغییر بسیار کوچک روی یک تابلو ممکن است باعث شود
        سیستم بینایی خودرو خودران آن را اشتباه تشخیص دهد.

        همچنین فیلترهای اسپم، سیستم‌های تشخیص چهره و سامانه‌های امنیتی
        می‌توانند هدف این حملات قرار گیرند.

      </p>




      <h3 className="subsection-heading">

        روش‌های تولید نمونه متخاصم

      </h3>




      <p className="para">

        بیشتر روش‌های تولید نمونه متخاصم یک مسئله بهینه‌سازی هستند:

        کمینه کردن فاصله نمونه جدید از نمونه اصلی،
        در حالی که خروجی مدل به سمت کلاس هدف هدایت می‌شود.

      </p>




      <MathBlock>

{`
loss(\\hat{f}(x+r),l)
+
c|r|
`}

      </MathBlock>




      <p className="para">

        در این رابطه:

      </p>




      <ul className="list">

        <li>
          x تصویر اصلی است.
        </li>

        <li>
          r اغتشاش اضافه‌شده به تصویر است.
        </li>

        <li>
          l کلاس هدف حمله است.
        </li>

        <li>
          c تعادل بین میزان تغییر تصویر و موفقیت حمله را کنترل می‌کند.
        </li>

      </ul>

      <h3 className="subsection-heading">

        روش بهینه‌سازی و خطای جزئی

      </h3>




      <p className="para">

        زگدی و همکاران یک روش مبتنی بر بهینه‌سازی گرادیانی برای تولید
        نمونه‌های متخاصم پیشنهاد کردند.

        هدف این روش پیدا کردن تغییر کوچکی در ورودی است که باعث شود
        مدل خروجی اشتباه تولید کند، در حالی که تصویر جدید برای انسان
        تقریباً مشابه تصویر اصلی باقی بماند.

      </p>




      <MathBlock>

{`
\\min_r
loss(\\hat{f}(x+r),l)
+
c\\cdot ||r||
`}

      </MathBlock>




      <p className="para">

        در این رابطه:

      </p>




      <ul className="list">


        <li>

          <span className="term-inline">
          x
          </span>

          تصویر اصلی است.

        </li>



        <li>

          <span className="term-inline">
          r
          </span>

          تغییر یا اغتشاش اضافه‌شده به تصویر است.

        </li>



        <li>

          <span className="term-inline">
          l
          </span>

          کلاس هدف حمله است.

        </li>



        <li>

          <span className="term-inline">
          c
          </span>

          میزان اهمیت شباهت تصویر اصلی و تصویر متخاصم را کنترل می‌کند.

        </li>


      </ul>




      <p className="para">

        این مسئله معمولاً با الگوریتم‌هایی مانند
        <span className="term-inline">
        L-BFGS
        </span>
        حل می‌شود و مقدار پیکسل‌ها نیز بین بازه صفر و یک محدود می‌گردد.

      </p>




      <Figure

        src="/images/AE1.png"

        caption="
        نمونه‌های متخاصم تولید شده برای مدل AlexNet.
        تصاویر سمت چپ توسط مدل به درستی طبقه‌بندی شده‌اند،
        اما با اضافه کردن اغتشاش کوچک، تصاویر سمت راست به اشتباه
        به عنوان کلاس شترمرغ تشخیص داده شده‌اند.
        "

        label="شکل ۵.۱"

      />






      <h3 className="subsection-heading">

        روش علامت گرادیان سریع
        (
        Fast Gradient Sign Method - FGSM
        )

      </h3>




      <p className="para">

        گودفلو و همکاران روش
        <span className="term-inline">
        FGSM
        </span>
        را برای ایجاد نمونه‌های متخاصم معرفی کردند.

        در این روش، مقدار بسیار کوچکی از خطا با توجه به علامت گرادیان
        تابع زیان به ورودی اضافه می‌شود.

      </p>




      <MathBlock>

{`
x'
=
x
+
\\epsilon
\\cdot
sign(\\nabla_x J(\\theta,x,y))
`}

      </MathBlock>




      <p className="para">

        در این رابطه:

      </p>




      <ul className="list">


        <li>
          ∇xJ گرادیان تابع زیان نسبت به ورودی است.
        </li>


        <li>
          ε مقدار شدت اغتشاش را مشخص می‌کند.
        </li>


        <li>
          θ پارامترهای مدل هستند.
        </li>


      </ul>




      <p className="para">

        ایده اصلی این حمله استفاده از حساسیت شبکه عصبی نسبت به تغییرات
        کوچک ورودی است.

        حتی تغییراتی که برای انسان قابل مشاهده نیستند،
        می‌توانند باعث تغییر شدید تصمیم مدل شوند.

      </p>




      <Figure

        src="./images/AE2.png"

        caption="
        نمونه متخاصم پاندا که توسط شبکه عصبی به عنوان گیبون تشخیص داده می‌شود.
        اغتشاش اضافه‌شده برای انسان قابل مشاهده نیست اما مدل را فریب می‌دهد.
        "

        label="شکل ۵.۲"

      />







      <h3 className="subsection-heading">

        حمله تک‌پیکسلی
        (
        1-Pixel Attack
        )

      </h3>




      <p className="para">

        سو و همکاران نشان دادند که حتی تغییر تنها یک پیکسل تصویر
        می‌تواند باعث فریب شبکه عصبی شود.

        این روش از الگوریتم تکامل تفاضلی
        (
        <span className="term-inline">
        Differential Evolution
        </span>
        )
        برای پیدا کردن بهترین موقعیت و مقدار تغییر پیکسل استفاده می‌کند.

      </p>




      <MathBlock>

{`
x_i(g+1)
=
x_{r1}(g)
+
F
\\cdot
(x_{r2}(g)-x_{r3}(g))
`}

      </MathBlock>




      <p className="para">

        هر راه‌حل شامل مکان پیکسل و مقدار رنگ
        RGB
        آن است.

        الگوریتم با ترکیب و جهش راه‌حل‌ها، پیکسلی را پیدا می‌کند
        که بیشترین احتمال موفقیت حمله را داشته باشد.

      </p>




      <Figure

        src="./images/AE3.png"

        caption="
        نمونه‌ای از حمله تک‌پیکسلی که با تغییر یک پیکسل باعث تغییر
        پیش‌بینی شبکه عصبی آموزش‌دیده روی ImageNet می‌شود.
        "

        label="شکل ۵.۳"

      />






      <h3 className="subsection-heading">

        وصله متخاصم
        (
        Adversarial Patch
        )

      </h3>




      <p className="para">

        براون و همکاران مفهوم نمونه‌های متخاصم را به دنیای فیزیکی
        گسترش دادند.

        در این روش به جای تغییر نامحسوس کل تصویر،
        یک وصله قابل چاپ روی بخشی از تصویر قرار داده می‌شود.

      </p>




      <p className="para">

        این وصله در شرایط مختلف مانند:

      </p>




      <ul className="list">


        <li>
          زاویه دید مختلف
        </li>


        <li>
          فاصله‌های متفاوت
        </li>


        <li>
          نورپردازی متفاوت
        </li>


      </ul>




      <p className="para">

        بهینه‌سازی می‌شود تا بتواند سیستم بینایی ماشین را فریب دهد.

        برای مثال، یک تصویر موز ممکن است توسط مدل به عنوان توستر
        طبقه‌بندی شود.

      </p>




      <Figure

        src="./images/AE4.png"

        caption="
        وصله متخاصم که باعث می‌شود مدل VGG16 تصویر موز را
        به اشتباه به عنوان توستر تشخیص دهد.
        "

        label="شکل ۵.۴"

      />
      <h3 className="subsection-heading">

        نمونه‌های متخاصم مقاوم در فضای سه‌بعدی
        (
        Robust Adversarial Examples
        )

      </h3>




      <p className="para">

        آتالیه و همکاران مفهوم نمونه‌های متخاصم را به فضای واقعی
        گسترش دادند.

        آن‌ها نشان دادند که می‌توان یک شیء فیزیکی مانند یک مدل سه‌بعدی
        را به گونه‌ای طراحی کرد که از دید شبکه عصبی در شرایط مختلف
        به اشتباه طبقه‌بندی شود.

      </p>




      <p className="para">

        مشکل اصلی روش‌های سنتی این است که با تغییر زاویه دید،
        نور یا فاصله دوربین، اثر حمله کاهش پیدا می‌کند.

        برای حل این مشکل، روش
        <span className="term-inline">
        Expectation Over Transformation (EOT)
        </span>
        معرفی شد.

      </p>




      <p className="para">

        در EOT، نمونه متخاصم نه برای یک تصویر ثابت،
        بلکه برای مجموعه‌ای از تبدیل‌های ممکن بهینه می‌شود.

      </p>




      <MathBlock>

{`
\\arg\\max_{x'}
E_{t\\sim T}
[
\\log P(y_t|t(x'))
]
`}

      </MathBlock>




      <p className="para">

        در این رابطه،
        T
        مجموعه‌ای از تبدیلات ممکن مانند چرخش، تغییر مقیاس و نورپردازی است.
        هدف، افزایش احتمال پیش‌بینی کلاس هدف در تمام این شرایط است.

      </p>




      <MathBlock>

{`
E_{t\\sim T}
[
d(t(x'),t(x))
]
<
\\epsilon
`}

      </MathBlock>




      <p className="para">

        بنابراین نمونه متخاصم باید علاوه بر موفقیت حمله،
        شباهت کافی خود را نسبت به نمونه اصلی حفظ کند.

      </p>




      <h3 className="subsection-heading">

        حمله جعبه‌سیاه
        (
        Black Box Attack
        )

      </h3>




      <p className="para">

        در بسیاری از کاربردهای واقعی، مهاجم به ساختار داخلی مدل،
        وزن‌ها یا گرادیان‌ها دسترسی ندارد.

        برای مثال، زمانی که یک مدل از طریق یک
        <span className="term-inline">
        Web API
        </span>
        ارائه می‌شود، تنها امکان ارسال ورودی و دریافت خروجی وجود دارد.

      </p>




      <p className="para">

        پیپرنوت و همکاران روشی برای حمله جعبه‌سیاه ارائه کردند
        که بر پایه ساخت یک مدل جایگزین
        (
        <span className="term-inline">
        Substitute Model
        </span>
        )
        عمل می‌کند.

      </p>




      <h3 className="subsection-heading">

        مراحل حمله جعبه‌سیاه

      </h3>




      <ol className="list">


        <li>

          ابتدا مجموعه‌ای از نمونه‌ها از یک دامنه مشابه داده‌های آموزشی
          انتخاب می‌شود.

        </li>



        <li>

          این نمونه‌ها به مدل هدف ارسال شده و خروجی آن دریافت می‌شود.

        </li>



        <li>

          با استفاده از این خروجی‌ها، یک مدل جایگزین آموزش داده می‌شود.

        </li>



        <li>

          نمونه‌های جدید برای بررسی مرز تصمیم مدل تولید می‌شوند.

        </li>



        <li>

          نمونه‌های متخاصم روی مدل جایگزین ساخته شده و سپس برای فریب
          مدل اصلی استفاده می‌شوند.

        </li>


      </ol>




      <p className="para">

        مزیت این روش آن است که حتی بدون دانستن ساختار مدل اصلی،
        می‌توان تقریب مناسبی از رفتار آن ایجاد کرد.

        همچنین این روش تنها محدود به شبکه‌های عصبی نیست و می‌تواند
        مدل‌هایی مانند درخت تصمیم را نیز هدف قرار دهد.

      </p>





      <div className="info-box red">


        <span className="info-icon">
          🚨
        </span>


        <div className="info-content">


          <strong>
            اهمیت امنیتی نمونه‌های متخاصم
          </strong>


          <p>

            نمونه‌های متخاصم نشان می‌دهند که دقت بالای مدل‌های یادگیری ماشین
            به معنی مقاومت آن‌ها در برابر حمله نیست.

            بنابراین در سامانه‌های حساس مانند خودروهای خودران،
            تشخیص پزشکی و امنیت سایبری،
            ارزیابی مقاومت مدل در برابر این حملات ضروری است.

          </p>


        </div>


      </div>





      <h3 className="subsection-heading">

        جمع‌بندی فصل

      </h3>




      <p className="para">

        در این فصل، سه دسته مهم از روش‌های توضیح و تحلیل مدل‌های
        یادگیری ماشین بررسی شد.

      </p>




      <ul className="list">


        <li>

          <strong>
          Prototype و Criticism:
          </strong>

          استفاده از نمونه‌های واقعی برای نمایش ساختار داده و نقاط مهم.

        </li>



        <li>

          <strong>
          Counterfactual Explanation:
          </strong>

          یافتن تغییرات حداقلی که باعث تغییر تصمیم مدل می‌شوند.

        </li>



        <li>

          <strong>
          Adversarial Examples:
          </strong>

          بررسی نقاط ضعف مدل‌ها در برابر تغییرات عمدی ورودی.

        </li>


      </ul>




      <p className="para">

        این روش‌ها مکمل یکدیگر هستند؛
        Prototypeها به درک کلی رفتار مدل کمک می‌کنند،
        Counterfactualها دلیل یک تصمیم خاص را توضیح می‌دهند،
        و نمونه‌های متخاصم آسیب‌پذیری‌های مدل را آشکار می‌سازند.

      </p>





      <PageFooter

        prev={{
          href: "/chapter/4",
          title: "روش‌های مستقل از مدل"
        }}

        next={{
          href: "/chapter/6",
          title: "روش‌های وابسته به مدل"
        }}

      />


    </DocLayout>
  );
}