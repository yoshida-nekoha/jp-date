# [WIP]JP-Date

Javascript で手軽に JST を扱うためのライブラリです。  
(他の国、タイムゾーンは考えていない)

## 特徴

- UTC+9時間
- 日本語でよく使うフォーマッタを装備

## インストール

```js
yarn add 'git+https://github.com/yoshida-nekoha/jp-date.git'
```

## 使い方

```js
import JST from `jp-date`

// JSTで現在時刻 を取得
const jst = new JST()

// 日付をフォーマットする
console.log(jst.format('yyyy/mm/dd HH:MM:SS (E)'));
// → 2022/06/16 21:22:56 (木)

```

### 利用できるもの

UTC '2021-12-31T23:07:02.123Z' での出力例。  
日本時間は`2022年1月1日午前8時7分2秒123 土曜日`です。

| パターン | 意味        | 出力例     |
| :------- | :---------- | :--------- |
| yyyy     | 年          | "2022"     |
| m        | 月          | "1"        |
| mm       | 月          | "01"       |
| d        | 日          | "1"        |
| dd       | 日          | "01"       |
| a        | AM/PM       | "AM"       |
| A        | 午前/午後   | "午前"     |
| h        | 時(AM/PM)   | "8"        |
| hh       | 時(AM/PM)   | "08"       |
| H        | 時(24hours) | "8"        |
| HH       | 時(24hours) | "08"       |
| M        | 分          | "7"        |
| MM       | 分          | "07"       |
| S        | 秒          | "2"        |
| SS       | 秒          | "02"       |
| s        | ミリ秒      | "1"        |
| ss       | ミリ秒      | "12"       |
| sss      | ミリ秒      | "123"      |
| e        | 曜日(US)    | "Sa"       |
| ee       | 曜日(US)    | "Sat"      |
| eee      | 曜日(US)    | "Saturday" |
| E        | 曜日(US)    | "土"       |
| EE       | 曜日(US)    | "土曜"     |
| EEE      | 曜日(US)    | "土曜日"   |
