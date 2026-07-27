"use client";

import type { TocItem } from "@/app/components/TableOfContents";
import DocLayout, { PageFooter } from "@/app/components/DocLayout";
import MathBlock from "@/app/components/MathBlock";
import CodeBlock from "@/app/components/CodeBlock";
import Figure from "@/app/components/Figure";


const toc: TocItem[] = [
  { id: "intro", title: "روش‌های مستقل از مدل", level: 2 },
  { id: "pdp", title: "نمودار وابستگی جزئی (PDP)", level: 2 },
  { id: "surrogate", title: "مدل جایگزین سراسری", level: 2 },
  { id: "lime", title: "مدل جایگزین محلی (LIME)", level: 2 },
  { id: "shap", title: "مقادیر شاپلی (SHAP)", level: 2 },
  { id: "feature", title: "اهمیت ویژگی", level: 2 },
];



const pdpCode = `
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.ensemble import RandomForestRegressor
from sklearn.inspection import PartialDependenceDisplay
from sklearn.model_selection import train_test_split


# Create synthetic bike-sharing dataset
np.random.seed(42)

n = 1000

temperature = np.random.uniform(0, 35, n)
humidity = np.random.uniform(20, 100, n)
windspeed = np.random.uniform(0, 35, n)


bikes = (
    3000
    + temperature * 90
    - humidity * 8
    - windspeed * 12
    + np.random.normal(0, 150, n)
)


df = pd.DataFrame({
    "temperature": temperature,
    "humidity": humidity,
    "windspeed": windspeed,
    "bikes": bikes
})


X = df[
    [
        "temperature",
        "humidity",
        "windspeed"
    ]
]

y = df["bikes"]


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)


model.fit(
    X_train,
    y_train
)


fig, ax = plt.subplots(
    figsize=(12,4)
)


PartialDependenceDisplay.from_estimator(
    model,
    X_train,
    features=[
        "temperature",
        "humidity",
        "windspeed"
    ],
    kind="average",
    ax=ax
)


fig.suptitle(
    "PDP Example",
    fontsize=22
)


plt.tight_layout()
plt.show()
`;



const surrogateCode = `
import pandas as pd

from sklearn.svm import SVR
from sklearn.tree import DecisionTreeRegressor
from sklearn.tree import export_text

from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
from sklearn.preprocessing import StandardScaler



url = (
 "https://raw.githubusercontent.com/"
 "christophM/interpretable-ml-book/"
 "master/data/bike.csv"
)


df = pd.read_csv(url)


features = [
    "temp",
    "hum",
    "windspeed",
    "season",
    "weekday"
]


X = df[features]

y = df["cnt"]


X_encoded = pd.get_dummies(
    X,
    drop_first=True
)


scaler = StandardScaler()


X_scaled = scaler.fit_transform(
    X_encoded
)


X_scaled_df = pd.DataFrame(
    X_scaled,
    columns=X_encoded.columns
)



X_train, X_test, y_train, y_test = train_test_split(
    X_scaled_df,
    y,
    test_size=0.2,
    random_state=42
)



black_box_model = SVR(
    kernel="rbf",
    C=5000,
    gamma="scale"
)


black_box_model.fit(
    X_train,
    y_train
)



bb_prediction = black_box_model.predict(
    X_train
)



surrogate = DecisionTreeRegressor(
    max_depth=3,
    random_state=42
)


surrogate.fit(
    X_train,
    bb_prediction
)



test_bb = black_box_model.predict(
    X_test
)


test_surrogate = surrogate.predict(
    X_test
)


score = r2_score(
    test_bb,
    test_surrogate
)


print(score)
`;



const limeCode = `
import numpy as np
import matplotlib.pyplot as plt

from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestClassifier

from lime.lime_tabular import LimeTabularExplainer



iris = load_iris()


X = iris.data
y = iris.target



X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)



model = RandomForestClassifier(
    random_state=42
)


model.fit(
    X_train,
    y_train
)



explainer = LimeTabularExplainer(
    training_data=X_train,
    feature_names=iris.feature_names,
    class_names=iris.target_names,
    mode="classification"
)



sample = X_test[0]


exp = explainer.explain_instance(
    sample,
    model.predict_proba,
    num_features=4
)


for feature, weight in exp.as_list():
    print(feature, weight)


fig = exp.as_pyplot_figure()

plt.show()
`;



const shapCode = `
import shap
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier



X, y = shap.datasets.adult()



X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)



model = RandomForestClassifier(
    n_estimators=100,
    max_depth=5,
    random_state=42
)


model.fit(
    X_train,
    y_train
)



explainer = shap.TreeExplainer(
    model
)


shap_values = explainer(
    X_test
)



shap.plots.waterfall(
    shap_values[0,:,1]
)


shap.plots.beeswarm(
    shap_values[:,:,1]
)
`;



export default function Chapter4() {

return (

<DocLayout
  toc={toc}
  prev={{
    href:"/chapter/3",
    title:"مدل‌های تفسیرپذیر"
  }}
  next={{
    href:"/chapter/5",
    title:"توضیحات مبتنی بر نمونه"
  }}
>

<div>


<div
className="chapter-eyebrow"
style={{
background:"#FDF2F8",
color:"#BE185D"
}}
>
فصل ۴
</div>



<h1
id="intro"
className="chapter-title"
style={{
scrollMarginTop:80
}}
>
روش‌های مستقل از مدل
</h1>


<p className="chapter-lead">
جداسازی فرآیند تولید توضیح از مدل یادگیری ماشین،
که تحت عنوان
Model-Agnostic Interpretation Methods
شناخته می‌شود،
امکان استفاده از روش‌های تفسیر را بدون وابستگی
به معماری مدل فراهم می‌کند.
</p>


<p className="para">
روش‌های مستقل از مدل، فرآیند تولید توضیح را از
مدل یادگیری ماشین جدا می‌کنند.
بزرگ‌ترین مزیت این رویکرد،
<span className="highlight">
انعطاف‌پذیری بالا
</span>
در انتخاب مدل است.
</p>


<div className="info-box gold">

<span className="info-icon">
💡
</span>


<div className="info-content">

<strong>
Model-Agnostic Methods
</strong>

این روش‌ها می‌توانند برای مدل‌هایی مانند
Random Forest،
SVM
و شبکه‌های عصبی عمیق استفاده شوند،
زیرا به ساختار داخلی مدل وابسته نیستند.

</div>

</div>


{/* ادامه در بخش ۲ */}
{/* 4.1 PDP */}

<h2
id="pdp"
className="section-heading"
>
۴-۱. نمودار وابستگی جزئی (Partial Dependence Plot)
</h2>


<p className="para">
نمودار وابستگی جزئی یا
<span className="term-inline">
Partial Dependence Plot (PDP)
</span>
یکی از روش‌های مستقل از مدل است که برای بررسی اثر یک یا چند ویژگی بر خروجی مدل استفاده می‌شود.
این روش نشان می‌دهد که تغییر مقدار یک ویژگی چگونه به صورت میانگین بر پیش‌بینی مدل تأثیر می‌گذارد.
</p>


<p className="para">
در PDP، اثر سایر ویژگی‌ها با میانگین‌گیری روی توزیع داده‌ها حذف می‌شود.
بنابراین می‌توان رابطه بین یک ویژگی خاص و خروجی مدل را بدون نیاز به دانستن ساختار داخلی مدل مشاهده کرد.
</p>



<div className="math-block-label">
تعریف ریاضی نمودار وابستگی جزئی
</div>


<MathBlock>
{`
\\hat f_{x_S}(x_S)
=
E_{x_C}
[
\\hat f(x_S,x_C)
]
=
\\frac{1}{n}
\\sum_i
\\hat f(x_S,x_C^{(i)})
`}
</MathBlock>



<p className="para">

در این رابطه:

</p>


<ul className="list">

<li>
<span className="term-inline">
xS
</span>
ویژگی یا مجموعه ویژگی‌های مورد بررسی است.
</li>


<li>
<span className="term-inline">
xC
</span>
سایر ویژگی‌های مدل هستند که روی آن‌ها میانگین‌گیری انجام می‌شود.
</li>


<li>
<span className="term-inline">
f̂
</span>
مدل آموزش‌دیده جعبه‌سیاه است.
</li>

</ul>



<div className="info-box blue">

<span className="info-icon">
📌
</span>


<div className="info-content">

<strong>
ایده اصلی PDP
</strong>

اگر مقدار یک ویژگی را تغییر دهیم و سایر ویژگی‌ها را ثابت نگه نداریم،
PDP میانگین اثر این تغییر را روی خروجی مدل نمایش می‌دهد.

</div>

</div>




<h3 className="subsection-heading">
مثال پیاده‌سازی PDP با Random Forest
</h3>



<p className="para">

در مثال زیر یک مجموعه داده مصنوعی مربوط به تعداد دوچرخه‌های کرایه‌ای ساخته شده است.
مدل
Random Forest
آموزش داده شده و سپس اثر ویژگی‌های دما، رطوبت و سرعت باد با PDP نمایش داده می‌شود.

</p>



<CodeBlock
code={pdpCode}
language="Python"
/>



<Figure

src="./images/PDP.png"

caption="
نمای خروجی نمودار PDP — نمایش اثر حاشیه‌ای دما، رطوبت و سرعت باد بر تعداد دوچرخه‌های کرایه‌ای.
"

label="شکل ۴.۱"

/>



<p className="para">

یکی از محدودیت‌های PDP این است که فرض می‌کند ویژگی‌ها مستقل هستند.
در داده‌هایی که بین ویژگی‌ها همبستگی زیادی وجود دارد،
ممکن است ترکیب‌هایی ایجاد شود که در داده واقعی مشاهده نشده‌اند.
به همین دلیل باید در تفسیر PDP با دقت عمل کرد.

</p>



<div className="info-box gold">

<span className="info-icon">
⚠️
</span>


<div className="info-content">

<strong>
محدودیت PDP
</strong>

در صورت وجود ویژگی‌های وابسته،
نتایج PDP ممکن است اثر واقعی ویژگی را بیش از حد ساده‌سازی کند.

</div>

</div>
{/* 4.2 Global Surrogate Model */}

<h2
id="surrogate"
className="section-heading"
>
۴-۲. مدل جایگزین سراسری (Global Surrogate Model)
</h2>



<p className="para">

مدل جایگزین سراسری یک مدل تفسیرپذیر است که برای تقریب رفتار یک مدل پیچیده
یا همان مدل جعبه‌سیاه آموزش داده می‌شود.
هدف این روش، ایجاد یک مدل ساده‌تر است که بتواند تصمیم‌های مدل اصلی را تا حد امکان تقلید کند.

</p>



<p className="para">

در این روش ابتدا یک مدل قدرتمند مانند شبکه عصبی،
SVM
یا
Random Forest
به عنوان مدل اصلی آموزش داده می‌شود.
سپس خروجی‌های این مدل به عنوان برچسب‌های جدید برای آموزش یک مدل ساده‌تر مانند درخت تصمیم استفاده می‌شوند.

</p>



<div className="math-block-label">
فرآیند مدل جایگزین سراسری
</div>


<MathBlock>

{`
g^*
=
argmin_g
L(f,g)
+
\\Omega(g)
`}

</MathBlock>



<p className="para">

در این رابطه:

</p>



<ul className="list">


<li>
<span className="term-inline">
f
</span>
مدل اصلی یا جعبه‌سیاه است.
</li>


<li>
<span className="term-inline">
g
</span>
مدل جایگزین تفسیرپذیر است.
</li>


<li>
<span className="term-inline">
L(f,g)
</span>
میزان اختلاف بین پیش‌بینی مدل اصلی و مدل جایگزین است.
</li>


<li>
<span className="term-inline">
Ω(g)
</span>
پیچیدگی مدل جایگزین را کنترل می‌کند.
</li>


</ul>



<h3 className="subsection-heading">

وفاداری مدل جایگزین (Fidelity)

</h3>



<p className="para">

معیار اصلی ارزیابی مدل جایگزین، میزان وفاداری آن به مدل اصلی است.
به عبارت دیگر بررسی می‌کنیم که مدل ساده تا چه اندازه رفتار مدل پیچیده را بازسازی می‌کند.

</p>



<div className="math-block-label">

معیار R² Fidelity

</div>



<MathBlock>

{`
R^2_{fidelity}
=
1-
\\frac{
\\sum_i(\\hat y_i^*-\\hat y_i)^2
}
{
\\sum_i(\\hat y_i-\\bar y)^2
}
`}

</MathBlock>




<p className="para">

مقدار بالاتر
R²
نشان‌دهنده این است که مدل جایگزین، تقریب بهتری از رفتار مدل اصلی ارائه می‌دهد.

</p>




<div className="info-box blue">

<span className="info-icon">
📌
</span>


<div className="info-content">


<strong>
نمونه رایج
</strong>


یک شبکه عصبی عمیق می‌تواند به عنوان مدل جعبه‌سیاه استفاده شود.
سپس یک درخت تصمیم کم‌عمق آموزش داده می‌شود تا تصمیم‌های شبکه عصبی را توضیح دهد.


</div>


</div>





<h3 className="subsection-heading">

مثال پیاده‌سازی مدل جایگزین با SVM و Decision Tree

</h3>




<p className="para">

در مثال زیر ابتدا یک مدل
SVM
به عنوان مدل جعبه‌سیاه آموزش داده می‌شود.
سپس خروجی‌های آن برای آموزش یک درخت تصمیم ساده استفاده می‌شوند.

</p>




<CodeBlock

code={surrogateCode}

language="Python"

/>





<p className="para">

مزیت اصلی مدل جایگزین این است که می‌توان مدل‌های بسیار پیچیده را بدون دسترسی به ساختار داخلی آن‌ها تحلیل کرد.
با این حال، اگر وفاداری مدل جایگزین پایین باشد، تفسیرهای ارائه‌شده قابل اعتماد نخواهند بود.

</p>




<div className="info-box gold">

<span className="info-icon">
⚠️
</span>


<div className="info-content">


<strong>
نکته مهم
</strong>


یک مدل جایگزین خوب الزاماً یک مدل دقیق برای پیش‌بینی نیست؛
هدف اصلی آن تقلید از رفتار مدل اصلی و ارائه توضیح قابل فهم است.


</div>


</div>
{/* 4.3 LIME */}

<h2
id="lime"
className="section-heading"
>
۴-۳. مدل جایگزین محلی (LIME)
</h2>



<p className="para">

روش
<span className="term-inline">
LIME (Local Interpretable Model-agnostic Explanations)
</span>
یکی از معروف‌ترین روش‌های تفسیر مستقل از مدل است که برای توضیح پیش‌بینی‌های یک نمونه خاص استفاده می‌شود.

</p>



<p className="para">

بر خلاف مدل جایگزین سراسری که رفتار کلی مدل را تقریب می‌زند،
LIME تنها ناحیه‌ای کوچک در اطراف یک نمونه خاص را بررسی می‌کند.
ایده اصلی این است که رفتار مدل پیچیده در یک محدوده کوچک را می‌توان با یک مدل ساده‌تر تقریب زد.

</p>



<div className="math-block-label">

تابع هدف LIME

</div>



<MathBlock>

{`
\\xi(x)
=
argmin_{g\\in G}
L(f,g,\\pi_x)
+
\\Omega(g)
`}

</MathBlock>



<p className="para">

در این فرمول:

</p>



<ul className="list">


<li>

<span className="term-inline">
f
</span>

مدل اصلی جعبه‌سیاه است.

</li>


<li>

<span className="term-inline">
g
</span>

مدل ساده و تفسیرپذیر محلی است.

</li>


<li>

<span className="term-inline">
πx
</span>

وزن‌دهی فاصله نمونه‌های اطراف نقطه موردنظر را مشخص می‌کند.

</li>


<li>

<span className="term-inline">
Ω(g)
</span>

پیچیدگی مدل توضیح‌دهنده را کنترل می‌کند.

</li>


</ul>





<h3 className="subsection-heading">

ایجاد نمونه‌های همسایه

</h3>



<p className="para">

LIME ابتدا نمونه‌های مصنوعی در اطراف نمونه موردنظر ایجاد می‌کند.
سپس مدل اصلی برای این نمونه‌ها پیش‌بینی انجام داده و یک مدل ساده مانند رگرسیون خطی روی این داده‌ها آموزش داده می‌شود.

</p>




<div className="math-block-label">

تابع وزن‌دهی فاصله در LIME

</div>



<MathBlock>

{`
\\pi_x(z)
=
exp
(
-
\\frac{
D(x,z)^2
}
{
\\sigma^2
}
)
`}

</MathBlock>



<p className="para">

در این رابطه،
D(x,z)
فاصله بین نمونه اصلی و نمونه مصنوعی است.
نمونه‌هایی که فاصله کمتری دارند، وزن بیشتری در آموزش مدل توضیح‌دهنده دریافت می‌کنند.

</p>





<div className="info-box blue">

<span className="info-icon">
💡
</span>


<div className="info-content">


<strong>
ایده اصلی LIME
</strong>


مدل جعبه‌سیاه در کل فضای ویژگی‌ها پیچیده است،
اما در یک محدوده کوچک اطراف یک نمونه می‌توان رفتار آن را با یک مدل ساده توضیح داد.


</div>


</div>





<h3 className="subsection-heading">

مثال پیاده‌سازی LIME برای طبقه‌بندی Iris

</h3>




<p className="para">

در مثال زیر یک مدل
Random Forest
آموزش داده شده و سپس LIME برای توضیح یک نمونه از داده‌های آزمون استفاده می‌شود.

</p>




<CodeBlock

code={limeCode}

language="Python"

/>





<Figure

src="./images/LIME-pic.png"

caption="
نمونه حذف معنادار بخش‌های تصویر برای تولید توضیح محلی توسط LIME.
"

label="شکل ۴.۲"

/>




<Figure

src="./images/LIME.png"

caption="
نمونه خروجی LIME برای یک پیش‌بینی. ویژگی‌های سبز تأثیر مثبت و ویژگی‌های قرمز تأثیر منفی بر تصمیم مدل دارند.
"

label="شکل ۴.۳"

/>





<h3 className="subsection-heading">

محدودیت‌های LIME

</h3>




<p className="para">

اگرچه LIME یک روش قدرتمند برای توضیح محلی است،
اما نتایج آن ممکن است به نحوه تولید نمونه‌های مصنوعی و انتخاب پارامترهای وزن‌دهی وابسته باشد.

</p>




<div className="info-box gold">

<span className="info-icon">
⚠️
</span>


<div className="info-content">


<strong>
وابستگی به نمونه‌گیری
</strong>


تغییر در نمونه‌های اطراف نقطه مورد بررسی می‌تواند باعث تغییر توضیح نهایی شود.
به همین دلیل پایداری توضیحات یکی از چالش‌های مهم LIME است.


</div>


</div>
{/* 4.4 SHAP */}

<h2
id="shap"
className="section-heading"
>
۴-۴. مقادیر شاپلی (Shapley Values)
</h2>



<p className="para">

روش
<span className="term-inline">
SHAP (SHapley Additive exPlanations)
</span>
یکی از قدرتمندترین روش‌های تفسیر مستقل از مدل است که بر پایه نظریه بازی‌های ائتلافی ارائه شده است.
این روش سهم هر ویژگی را در خروجی نهایی مدل محاسبه می‌کند.

</p>



<p className="para">

در نظریه بازی‌ها، هر ویژگی مانند یک بازیکن در نظر گرفته می‌شود که به صورت گروهی در ایجاد خروجی مدل مشارکت می‌کند.
مقدار شاپلی تلاش می‌کند سهم منصفانه هر ویژگی را با بررسی تمام ترکیب‌های ممکن ویژگی‌ها محاسبه کند.

</p>




<div className="math-block-label">

فرمول مقدار شاپلی

</div>



<MathBlock>

{`
\\phi_j(v)
=
\\sum_{S\\subseteq F\\setminus\\{j\\}}
\\frac{
|S|!(p-|S|-1)!
}{
p!
}
(
v(S\\cup\\{j\\})
-
v(S)
)
`}

</MathBlock>



<p className="para">

در این رابطه:

</p>



<ul className="list">


<li>

<span className="term-inline">
φj
</span>

مقدار تأثیر ویژگی j است.

</li>


<li>

<span className="term-inline">
S
</span>

مجموعه‌ای از ویژگی‌های موجود قبل از اضافه شدن ویژگی j است.

</li>


<li>

<span className="term-inline">
v(S)
</span>

خروجی مدل با استفاده از مجموعه ویژگی S است.

</li>


<li>

<span className="term-inline">
p
</span>

تعداد کل ویژگی‌ها است.

</li>


</ul>





<div className="info-box blue">

<span className="info-icon">
📌
</span>


<div className="info-content">


<strong>
تفسیر مقدار SHAP
</strong>


اگر مقدار SHAP یک ویژگی مثبت باشد،
آن ویژگی باعث افزایش خروجی مدل شده است.
مقدار منفی نشان‌دهنده کاهش خروجی مدل است.


</div>


</div>






<h3 className="subsection-heading">

تقریب مقدار شاپلی با نمونه‌گیری مونت‌کارلو

</h3>



<p className="para">

محاسبه دقیق مقدار شاپلی نیازمند بررسی تمام زیرمجموعه‌های ممکن ویژگی‌ها است که برای مدل‌های بزرگ هزینه محاسباتی زیادی دارد.
به همین دلیل معمولاً از روش‌های تقریبی مانند نمونه‌گیری مونت‌کارلو استفاده می‌شود.

</p>




<div className="math-block-label">

تخمین مقدار شاپلی

</div>




<MathBlock>

{`
\\hat{\\phi}_j
=
\\frac{1}{M}
\\sum_m
(
\\hat f(x^+_j{}^m)
-
\\hat f(x^-_j{}^m)
)
`}

</MathBlock>





<h3 className="subsection-heading">

پیاده‌سازی SHAP با Random Forest

</h3>




<p className="para">

در مثال زیر ابتدا یک مدل
Random Forest
روی مجموعه داده
Adult
آموزش داده می‌شود.
سپس از
TreeExplainer
برای محاسبه مقادیر SHAP استفاده می‌شود.

</p>




<CodeBlock

code={shapCode}

language="Python"

/>





<Figure

src="./images/SHAP1.png"

caption="
نمودار آبشاری SHAP برای یک نمونه خاص. ویژگی‌ها میزان تأثیر خود را در افزایش یا کاهش خروجی مدل نشان می‌دهند.
"

label="شکل ۴.۴"

/>




<Figure

src="./images/SHAP2.png"

caption="
نمودار Beeswarm برای نمایش اهمیت کلی ویژگی‌ها در مجموعه داده. رنگ‌ها مقدار کم یا زیاد ویژگی را نمایش می‌دهند.
"

label="شکل ۴.۵"

/>






<h3 className="subsection-heading">

مزایا و محدودیت‌های SHAP

</h3>




<p className="para">

یکی از مهم‌ترین مزایای SHAP داشتن پایه نظری قوی و ویژگی‌های مطلوب مانند سازگاری
(Consistency)
و تخصیص عادلانه سهم ویژگی‌ها است.
همچنین SHAP می‌تواند هم توضیح محلی و هم توضیح سراسری ارائه دهد.

</p>




<div className="info-box gold">

<span className="info-icon">
⚠️
</span>


<div className="info-content">


<strong>
هزینه محاسباتی
</strong>


محاسبه دقیق مقادیر شاپلی برای تعداد زیادی ویژگی بسیار پرهزینه است،
به همین دلیل در عمل از الگوریتم‌های تقریبی مانند
TreeSHAP
و
KernelSHAP
استفاده می‌شود.


</div>


</div>
{/* 4.5 Feature Importance */}

<h2
id="feature"
className="section-heading"
>
۴-۵. اهمیت ویژگی با جایگشت (Permutation Feature Importance)
</h2>



<p className="para">

اهمیت ویژگی با جایگشت یکی دیگر از روش‌های مستقل از مدل است که میزان تأثیر هر ویژگی را بر عملکرد مدل اندازه‌گیری می‌کند.
ایده اصلی این روش این است که مقدار یک ویژگی به صورت تصادفی جابه‌جا شود و سپس تغییر عملکرد مدل بررسی گردد.

</p>



<p className="para">

اگر جابه‌جایی مقادیر یک ویژگی باعث کاهش شدید عملکرد مدل شود،
آن ویژگی نقش مهمی در تصمیم‌گیری مدل دارد.
در مقابل، اگر تغییر عملکرد ناچیز باشد، ویژگی اهمیت کمتری دارد.

</p>



<div className="math-block-label">

فرمول اهمیت ویژگی با جایگشت

</div>



<MathBlock>

{`
FI_j
=
e_{perm}
-
e_{orig}
`}

</MathBlock>



<p className="para">

در این رابطه:

</p>



<ul className="list">

<li>

<span className="term-inline">
eorig
</span>

خطای مدل روی داده اصلی است.

</li>


<li>

<span className="term-inline">
eperm
</span>

خطای مدل پس از جایگشت مقادیر ویژگی j است.

</li>


<li>

<span className="term-inline">
FIj
</span>

اهمیت ویژگی j را نشان می‌دهد.

</li>

</ul>




<div className="info-box blue">

<span className="info-icon">
📊
</span>


<div className="info-content">


<strong>
تفسیر اهمیت ویژگی
</strong>


هرچه افزایش خطا پس از جایگشت یک ویژگی بیشتر باشد،
مدل وابستگی بیشتری به آن ویژگی دارد.


</div>


</div>





<h3 className="subsection-heading">

داده مناسب برای محاسبه اهمیت ویژگی

</h3>




<p className="para">

انتخاب داده برای محاسبه اهمیت ویژگی به هدف تحلیل بستگی دارد.

</p>




<ul className="list">


<li>

اگر هدف بررسی وابستگی مدل به ویژگی‌ها باشد،
می‌توان از داده‌های آموزش استفاده کرد.

</li>


<li>

اگر هدف بررسی توانایی تعمیم مدل باشد،
استفاده از داده‌های آزمون مناسب‌تر است.

</li>


</ul>




<div className="info-box gold">

<span className="info-icon">
⚠️
</span>


<div className="info-content">


<strong>
نکته مهم
</strong>


در ویژگی‌هایی که با یکدیگر همبستگی بالایی دارند،
ممکن است اهمیت یک ویژگی کمتر از مقدار واقعی تخمین زده شود،
زیرا ویژگی‌های مشابه می‌توانند اثر یکدیگر را جبران کنند.


</div>


</div>





<h3 className="subsection-heading">

مقایسه روش‌های مستقل از مدل

</h3>



<div className="table-wrapper">

<table className="content-table">

<thead>

<tr>

<th>
روش
</th>

<th>
نوع توضیح
</th>

<th>
مزیت اصلی
</th>

<th>
محدودیت
</th>

</tr>

</thead>


<tbody>


<tr>

<td>
PDP
</td>

<td>
سراسری
</td>

<td>
نمایش رابطه ویژگی و خروجی
</td>

<td>
حساس به همبستگی ویژگی‌ها
</td>

</tr>



<tr>

<td>
Global Surrogate
</td>

<td>
سراسری
</td>

<td>
توضیح مدل‌های پیچیده با مدل ساده
</td>

<td>
وابسته به میزان Fidelity
</td>

</tr>




<tr>

<td>
LIME
</td>

<td>
محلی
</td>

<td>
توضیح یک نمونه خاص
</td>

<td>
ناپایداری نمونه‌گیری
</td>

</tr>




<tr>

<td>
SHAP
</td>

<td>
محلی و سراسری
</td>

<td>
پایه نظری قوی و سهم عادلانه ویژگی‌ها
</td>

<td>
هزینه محاسباتی بالا
</td>

</tr>




<tr>

<td>
Permutation Importance
</td>

<td>
سراسری
</td>

<td>
ساده و مستقل از مدل
</td>

<td>
مشکل در ویژگی‌های همبسته
</td>

</tr>



</tbody>

</table>

</div>





<div className="info-box green">

<span className="info-icon">
✅
</span>


<div className="info-content">


<strong>
جمع‌بندی فصل
</strong>


روش‌های مستقل از مدل امکان تحلیل و توضیح مدل‌های پیچیده یادگیری ماشین را بدون نیاز به دسترسی به ساختار داخلی آن‌ها فراهم می‌کنند.
در این فصل روش‌های PDP،
Global Surrogate،
LIME،
SHAP
و
Permutation Feature Importance
بررسی شدند.


</div>


</div>





<PageFooter

prev={{
href:"/chapter/3",
title:"مدل‌های تفسیرپذیر"
}}


next={{
href:"/chapter/5",
title:"توضیحات مبتنی بر نمونه"
}}

/>



</div>

</DocLayout>

);

}