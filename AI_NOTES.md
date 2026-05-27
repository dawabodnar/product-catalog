# AI_NOTES

## 1. Чи використовувався штучний інтелект

Так, використовувала. AI : пояснював концепти, давав чернетки коду, які я потім перевіряла і часто переписувала під себе. Все, що в коді — я розумію і можу пояснити рядок за рядком.

## 2. З якими частинами AI допоміг

- Ідея зберігати status як рядок ("loading"/"success"/"error") замість трьох булевих змінних
- Концепт custom hook (`useFavorites`/`useCompare`) як спосіб винести логіку зі сторінки
- Базова BEM-конвенція в CSS
- Accessibility-патерни: `aria-pressed`, `aria-label`, `role="alert"`, обгортка контролів у `<label>`
- Пояснення, чому фільтр/сортування потрібно через useMemo, а не зберігати окремим станом
- Базові CSS-анімації: спінер через `@keyframes`, fade-in, scale on press

## 3. Що я вручну переглядала і змінювала

**Знайшла баг з "-0%".** AI пропонував фільтрувати знижку як `discountPercentage > 0`. Я помітила, що тоді товар з `discountPercentage: 0.4` показував беджик "-0%" (бо я округлювала для відображення) і проходив фільтр. Виправила на `Math.round(p.discountPercentage) > 0`. Винесла в утиліту `hasMeaningfulDiscount`, щоб і фільтр, і відображення використовували одне правило.

**Розширила статус наявності до 3 станів.** AI пропонував два стани (`stock > 0` vs `stock === 0`).Додала стан "Закінчується" з помаранчевим кольором. Винесла в утиліту `getStockState`/`getStockLabel`.

**Спростила useFavorites.** AI пропонував `useCallback`, lazy initialization, функціональні оновлення стану. Зрозуміла, що для 30 товарів без `React.memo` це нічого не дає, тільки заплутує код. Прибрала useCallback, переписала простіше.

**Спростила fetch-логіку.** AI пропонував складний варіант з cancelled-flag і дублюванням функції для retry. Я обрала простіший варіант — функцію всередині useEffect, без retry-кнопки.

## 4. Приклад пропозиції AI, яку я відхилила

AI запропонував такий патерн для fetch-логіки:

```js
const loadProducts = useCallback(async () => {
  setStatus("loading");
  setError("");
  try {
    const data = await fetchProducts();
    setProducts(data);
    setStatus("success");
  } catch (err) {
    setError(err.message);
    setStatus("error");
  }
}, []);

useEffect(() => {
  let cancelled = false;
  async function run() {
    setStatus("loading");
    setError("");
    try {
      const data = await fetchProducts();
      if (!cancelled) {
        setProducts(data);
        setStatus("success");
      }
    } catch (err) {
      if (!cancelled) {
        setError(err.message);
        setStatus("error");
      }
    }
  }
  run();
  return () => { cancelled = true; };
}, []);
```

Тут дві майже однакові функції — `loadProducts` для retry-кнопки і `run` всередині useEffect із захистом від "setState on unmounted component".

**Відхилила.** Це дублювання заради захисту, який нам не потрібен — App.jsx кореневий, він не демонтовується посеред fetch. У застосунку з роутингом це мало б сенс, але не тут.

Замість цього зробила одну функцію всередині useEffect, без окремої retry. Якщо помилка — користувач перезавантажує сторінку. Код став коротший.

## Підхід в цілому

Я ставилась до AI як до колеги, з яким можна обговорити рішення, а не як до автодоповнювача. Якщо щось пропонувалось — питала "чому так", "що буде якщо інакше". Якщо не розуміла — не вставляла. Якщо здавалось надто складним для нашого розміру задачі — обирала простіше.