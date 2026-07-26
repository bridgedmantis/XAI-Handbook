"use client";
import type { TocItem } from "@/app/components/TableOfContents";
import DocLayout, { PageFooter } from "@/app/components/DocLayout";
import MathBlock from "@/app/components/MathBlock";
import CodeBlock from "@/app/components/CodeBlock";
import Figure from "@/app/components/Figure";

const toc: TocItem[] = [
  { id: "intro", title: "روش‌های مستقل از مدل", level: 2 },
  { id: "s1", title: "نمودار وابستگی جزئی (PDP)", level: 2 },
  { id: "s2", title: "مدل جایگزین سراسری", level: 2 },
  { id: "s3", title: "مدل جایگزین محلی (LIME)", level: 2 },
  { id: "s4", title: "مقادیر شاپلی (SHAP)", level: 2 },
  { id: "s5", title: "اهمیت ویژگی با جایگشت", level: 2 },
];

const pdpCode = `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor
from sklearn.inspection import PartialDependenceDisplay
from sklearn.model_selection import train_test_split

# 1. Create synthetic bike-sharing dataset
np.random.seed(42)
n = 1000
temperature = np.random.uniform(0, 35, n)
humidity = np.random.uniform(20, 100, n)
windspeed = np.random.uniform(0, 35, n)

bikes = (
    3000 + temperature * 90 - humidity * 8 - windspeed * 12
    + np.random.normal(0, 150, n)
)

df = pd.DataFrame({
    "temperature": temperature,
    "humidity": humidity,
    "windspeed": windspeed,
    "bikes": bikes
})

# 2. Train model
X = df[["temperature", "humidity", "windspeed"]]
y = df["bikes"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 3. Plot PDP
fig, ax = plt.subplots(figsize=(12, 4))
PartialDependenceDisplay.from_estimator(
    model, X_train,
    features=["temperature", "humidity", "windspeed"],
    kind="average", ax=ax
)
fig.suptitle("PDP Example", fontsize=22)
plt.tight_layout()
plt.show()`;

const surrogateCode = `import pandas as pd
from sklearn.svm import SVR
from sklearn.tree import DecisionTreeRegressor, export_text
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
from sklearn.preprocessing import StandardScaler

# 1. Load dataset
url = ("https://raw.githubusercontent.com/christophM/"
       "interpretable-ml-book/master/data/bike.csv")
df = pd.read_csv(url)

features = ["temp", "hum", "windspeed", "season", "weekday"]
X = df[features]
y = df["cnt"]

X_encoded = pd.get_dummies(X, drop_first=True)
encoded_features = X_encoded.columns

# 2. Standardize
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_encoded)
X_scaled_df = pd.DataFrame(X_scaled, columns=encoded_features)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled_df, y, test_size=0.2, random_state=42
)

# 3. Black Box Model (SVM)
black_box_model = SVR(kernel='rbf', C=5000, gamma='scale')
black_box_model.fit(X_train, y_train)

# 4. Surrogate Model (Decision Tree)
bb_train_predictions = black_box_model.predict(X_train)
surrogate_model = DecisionTreeRegressor(max_depth=3, random_state=42)
surrogate_model.fit(X_train, bb_train_predictions)

# 5. Evaluate Fidelity
bb_test_predictions = black_box_model.predict(X_test)
surrogate_test_predictions = surrogate_model.predict(X_test)
fidelity_r2 = r2_score(bb_test_predictions, surrogate_test_predictions)
print(f"R2 Fidelity: {fidelity_r2:.2f}")`;

const limeCode = `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from lime.lime_tabular import LimeTabularExplainer

# 1. Load dataset
iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 2. Train model (Black Box)
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# 3. LIME Explainer
explainer = LimeTabularExplainer(
    training_data=X_train,
    feature_names=iris.feature_names,
    class_names=iris.target_names,
    mode='classification'
)

# 4. Explain one instance
sample = X_test[0]
exp = explainer.explain_instance(
    data_row=sample,
    predict_fn=model.predict_proba,
    num_features=4
)

print("LIME Explanation:")
for feature, weight in exp.as_list():
    print(f"  {feature}: {weight:.4f}")

fig = exp.as_pyplot_figure()
plt.tight_layout()
plt.show()`;

const shapCode = `import shap
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# 1. Load data
X, y = shap.datasets.adult()
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 2. Train model
model = RandomForestClassifier(
    n_estimators=100, max_depth=5, random_state=42
)
model.fit(X_train, y_train)

# 3. SHAP Explainer
explainer = shap.TreeExplainer(model)
shap_values = explainer(X_test)

# 4. Visualization
shap.plots.waterfall(shap_values[0, :, 1])  # Single sample
shap.plots.beeswarm(shap_values[:, :, 1])   # Global view`;

export default function Chapter4() {
  return (
    <DocLayout
      toc={toc}
      prev={{ href: "/chapter/3", title: "مدل‌های تفسیرپذیر" }}
      next={{ href: "/chapter/5", title: "توضیحات مبتنی بر نمونه" }}
    >
      <div>
        <div className="chapter-eyebrow" style={{ background: "#FDF2F8", color: "#BE185D" }}>
          CHAPTER 04
        </div>
        <h1 id="intro" className="chapter-title" style={{ scrollMarginTop: 80 }}>
          روش‌های مستقل از مدل
        </h1>
        <p className="chapter-lead">
          جداسازی فرآیندِ تولیدِ توضیح از خودِ مدل یادگیری ماشین، که تحت عنوان
          روش‌های تفسیرِ مستقل از مدل (Model-Agnostic) شناخته می‌شود، انعطاف‌پذیری بالایی
          فراهم می‌کند. در این فصل PDP، مدل جایگزین سراسری، LIME، SHAP و اهمیت ویژگی را
          مطالعه می‌کنیم.
        </p>
        <p className="para">
          جداسازی فرآیندِ تولیدِ توضیح از خودِ مدل یادگیری ماشین، که تحت عنوان
          <span className="term-inline"> روش‌های تفسیرِ مستقل از مدل</span> شناخته می‌شود،
          مزایای متعددی دارد. بزرگ‌ترین مزیت این رویکرد،{" "}
          <span className="highlight">انعطاف‌پذیری بالای آن</span> است. هر روشی را می‌توان
          پس از آموزش روی هر مدل دلخواهی اعمال کرد، بدون اینکه محدودیتی در انتخاب مدل
          پیش‌بین اصلی وجود داشته باشد.
        </p>

        <div className="info-box gold">
          <span className="info-icon">⚠️</span>
          <div className="info-content">
            <strong>وضعیت فصل</strong>
            این فصل به صورت خلاصه ارائه شده است. متن کامل در نسخه‌های بعدی اضافه خواهد شد.
            در حال حاضر فرمول‌ها و کدهای نمونه در دسترس می‌باشند.
          </div>
        </div>

        {/* 4.1 PDP */}
        <h2 id="s1" className="section-heading">
          ۴-۱. نمودار وابستگی جزئی (PDP)
        </h2>
        <p className="para">
          نمودار وابستگی جزئی (Partial Dependence Plot یا PDP) اثر حاشیه‌ای یک یا دو ویژگی را
          بر خروجی پیش‌بینی‌شده نشان می‌دهد:
        </p>
        <div className="math-block-label">تعریف نمودار وابستگی جزئی</div>
        <MathBlock>
          f̂_xS(xS) = E_xC [ f̂(xS, xC) ] = (1/n) Σᵢ f̂(xS, xC⁽ⁱ⁾)
        </MathBlock>
        <CodeBlock code={pdpCode} language="Python" />
        <Figure
          src="./images/PDP.png"
          caption="نمای خروجی نمودار PDP — نمایش اثر حاشیه‌ای دما، رطوبت و سرعت باد بر تعداد دوچرخه‌های کرایه‌ای."
          label="شکل ۴.۱"
        />

        {/* 4.2 Global Surrogate */}
        <h2 id="s2" className="section-heading">
          ۴-۲. مدل جایگزین سراسری (Global Surrogate)
        </h2>
        <p className="para">
          یک مدل جایگزین سراسری، یک مدل تفسیرپذیر است که برای تقریب زدن پیش‌بینی‌های یک مدل
          جعبه‌سیاه آموزش داده می‌شود. معیار ارزیابی تطابق (وفاداری):
        </p>
        <div className="math-block-label">وفاداری R² در مدل جایگزین</div>
        <MathBlock>
          R²_fidelity = 1 - Σ(ŷ*⁽ⁱ⁾ - ŷ⁽ⁱ⁾)² / Σ(ŷ⁽ⁱ⁾ - ȳ̂)²
        </MathBlock>
        <CodeBlock code={surrogateCode} language="Python" />

        {/* 4.3 LIME */}
        <h2 id="s3" className="section-heading">
          ۴-۳. مدل جایگزین محلی — LIME
        </h2>
        <p className="para">
          مدل‌های جایگزین محلی برای توضیح پیش‌بینی‌های فردی مدل‌های جعبه‌سیاه مورد استفاده قرار
          می‌گیرند. LIME با حل یک مسئله بهینه‌سازی محلی، توضیحی ساده و قابل فهم ارائه می‌دهد:
        </p>
        <div className="math-block-label">تابع هدف LIME</div>
        <MathBlock>
          explanation(x) = argmin_(g∈G)   L(f, g, πₓ) + Ω(g)
        </MathBlock>
        <p className="para">
          LIME با استفاده از هسته هموارسازی نمایی برای وزن‌دهی نقاط اطراف نمونه مدنظر عمل می‌کند:
        </p>
        <div className="math-block-label">هسته وزن‌دهی LIME</div>
        <MathBlock>
          πₓ(z) = exp(-D(x, z)² / σ²)
        </MathBlock>
        <CodeBlock code={limeCode} language="Python" />
        <Figure
          src="./images/LIME-pic.png"
          caption="نمونه حذف معنادار بخش‌های عکس در تفسیر LIME."
          label="شکل ۴.۲"
        />
        <Figure
          src="./images/LIME.png"
          caption="تفسیر محلی پیش‌بینی مدل با استفاده از LIME برای کلاس versicolor. میله‌های سبز تأثیر مثبت و میله قرمز تأثیر منفی بر پیش‌بینی را نشان می‌دهند."
          label="شکل ۴.۳"
        />

        {/* 4.4 SHAP */}
        <h2 id="s4" className="section-heading">
          ۴-۴. مقادیر شاپلی (Shapley Values)
        </h2>
        <p className="para">
          مقدار شاپلی که ریشه در نظریه بازی‌های ائتلافی دارد، روشی را ارائه می‌دهد که به کمک آن
          می‌توان پیش‌بینی مدل را به شکلی کاملاً عادلانه در میان ویژگی‌ها توزیع کرد:
        </p>
        <div className="math-block-label">فرمول مقدار شاپلی</div>
        <MathBlock>
          {`φⱼ(val) = Σ_{S⊆F\\{j}} [ |S|! (p-|S|-1)! / p! ] · (val(S∪{j}) - val(S))`}
        </MathBlock>
        <p className="para">تقریب با نمونه‌گیری مونت-کارلو:</p>
        <div className="math-block-label">تخمین مقدار شاپلی با نمونه‌گیری</div>
        <MathBlock>
          φ̂ⱼ = (1/M) Σₘ (f̂(x⁺ⱼᵐ) - f̂(x⁻ⱼᵐ))
        </MathBlock>
        <CodeBlock code={shapCode} language="Python" />
        <Figure
          src="./images/SHAP1.png"
          caption="نمودار آبشاری SHAP برای تفسیر محلی یک نمونه خاص. فلش‌های آبی تأثیر منفی و فلش‌های قرمز تأثیر مثبت بر پیش‌بینی را نشان می‌دهند."
          label="شکل ۴.۴"
        />
        <Figure
          src="./images/SHAP2.png"
          caption="نمودار Beeswarm برای ارزیابی اهمیت سراسری ویژگی‌ها. رنگ قرمز نشان‌دهنده مقادیر بالا و رنگ آبی نشان‌دهنده مقادیر پایین."
          label="شکل ۴.۵"
        />

        {/* 4.5 Feature Importance */}
        <h2 id="s5" className="section-heading">
          ۴-۵. اهمیت ویژگی با جایگشت (Permutation Feature Importance)
        </h2>
        <p className="para">
          اهمیت یک ویژگی، برابر است با میزان افزایش در خطای پیش‌بینیِ مدل پس از اِعمال جایگشت بر
          روی مقادیر آن ویژگی:
        </p>
        <div className="math-block-label">فرمول اهمیت ویژگی با جایگشت</div>
        <MathBlock>
          FIⱼ = e_perm / e_orig   یا   FIⱼ = e_perm - e_orig
        </MathBlock>
        <div className="info-box gold">
          <span className="info-icon">📊</span>
          <div className="info-content">
            <strong>کدام داده برای محاسبه استفاده شود؟</strong>
            اگر می‌خواهید بدانید مدل چقدر به ویژگی <em>متکی است</em> → از داده‌های آموزشی استفاده کنید.
            اگر می‌خواهید بدانید ویژگی در <em>تعمیم‌پذیری</em> چقدر نقش دارد → از داده‌های آزمون استفاده کنید.
          </div>
        </div>

        <PageFooter
          prev={{ href: "/chapter/3", title: "مدل‌های تفسیرپذیر" }}
          next={{ href: "/chapter/5", title: "توضیحات مبتنی بر نمونه" }}
        />
      </div>
    </DocLayout>
  );
}
