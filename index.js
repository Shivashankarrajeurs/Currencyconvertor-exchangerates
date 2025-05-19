import express from "express";
import axios from "axios";

const port = process.env.PORT || 3000;
const app=express();


const currencyCodes = [
   "INR", "ADA", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARB", "ARS",
   "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD",
   "BNB", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYN", "BYR",
   "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC", "CUC",
   "CUP", "CVE", "CZK", "DAI", "DJF", "DKK", "DOP", "DOT", "DZD", "EGP",
   "ERN", "ETB", "ETH", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS",
   "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
   "IDR", "ILS", "IMP", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY",
   "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK",
   "LBP", "LKR", "LRD", "LSL", "LTC", "LTL", "LVL", "LYD", "MAD", "MDL",
   "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN",
   "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "OP",
   "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD",
   "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL",
   "SOL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL", "THB", "TJS", "TMT",
   "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU",
   "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XCD", "XDR",
   "XOF", "XPD", "XPF", "XPT", "XRP", "YER", "ZAR", "ZMK", "ZMW", "ZWL"
];


const currencies = [
  { code: "AED", name: "United Arab Emirates Dirham", flag: "ae" },
                { code: "AFN", name: "Afghan Afghani", flag: "af" },
                { code: "ALL", name: "Albanian Lek", flag: "al" },
                { code: "AMD", name: "Armenian Dram", flag: "am" },
                { code: "ANG", name: "Netherlands Antillean Guilder", flag: "an" },
                { code: "AOA", name: "Angolan Kwanza", flag: "ao" },
                { code: "ARS", name: "Argentine Peso", flag: "ar" },
                { code: "AUD", name: "Australian Dollar", flag: "au" },
                { code: "AWG", name: "Aruban Florin", flag: "aw" },
                { code: "AZN", name: "Azerbaijani Manat", flag: "az" },
                { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", flag: "ba" },
                { code: "BBD", name: "Barbadian Dollar", flag: "bb" },
                { code: "BDT", name: "Bangladeshi Taka", flag: "bd" },
                { code: "BGN", name: "Bulgarian Lev", flag: "bg" },
                { code: "BHD", name: "Bahraini Dinar", flag: "bh" },
                { code: "BIF", name: "Burundian Franc", flag: "bi" },
                { code: "BMD", name: "Bermudian Dollar", flag: "bm" },
                { code: "BND", name: "Brunei Dollar", flag: "bn" },
                { code: "BOB", name: "Bolivian Boliviano", flag: "bo" },
                { code: "BRL", name: "Brazilian Real", flag: "br" },
                { code: "BSD", name: "Bahamian Dollar", flag: "bs" },
                { code: "BTN", name: "Bhutanese Ngultrum", flag: "bt" },
                { code: "BWP", name: "Botswana Pula", flag: "bw" },
                { code: "BYN", name: "Belarusian Ruble", flag: "by" },
                { code: "BZD", name: "Belize Dollar", flag: "bz" },
                { code: "CAD", name: "Canadian Dollar", flag: "ca" },
                { code: "CDF", name: "Congolese Franc", flag: "cd" },
                { code: "CHF", name: "Swiss Franc", flag: "ch" },
                { code: "CLP", name: "Chilean Peso", flag: "cl" },
                { code: "CNY", name: "Chinese Yuan", flag: "cn" },
                { code: "COP", name: "Colombian Peso", flag: "co" },
                { code: "CRC", name: "Costa Rican Colón", flag: "cr" },
                { code: "CUP", name: "Cuban Peso", flag: "cu" },
                { code: "CVE", name: "Cape Verdean Escudo", flag: "cv" },
                { code: "CZK", name: "Czech Koruna", flag: "cz" },
                { code: "DJF", name: "Djiboutian Franc", flag: "dj" },
                { code: "DKK", name: "Danish Krone", flag: "dk" },
                { code: "DOP", name: "Dominican Peso", flag: "do" },
                { code: "DZD", name: "Algerian Dinar", flag: "dz" },
                { code: "EGP", name: "Egyptian Pound", flag: "eg" },
                { code: "ERN", name: "Eritrean Nakfa", flag: "er" },
                { code: "ETB", name: "Ethiopian Birr", flag: "et" },
                { code: "EUR", name: "Euro", flag: "eu" },
                { code: "FJD", name: "Fijian Dollar", flag: "fj" },
                { code: "FKP", name: "Falkland Islands Pound", flag: "fk" },
                { code: "FOK", name: "Faroese Króna", flag: "fo" },
                { code: "GBP", name: "British Pound Sterling", flag: "gb" },
                { code: "GEL", name: "Georgian Lari", flag: "ge" },
                { code: "GGP", name: "Guernsey Pound", flag: "gg" },
                { code: "GHS", name: "Ghanaian Cedi", flag: "gh" },
                { code: "GIP", name: "Gibraltar Pound", flag: "gi" },
                { code: "GMD", name: "Gambian Dalasi", flag: "gm" },
                { code: "GNF", name: "Guinean Franc", flag: "gn" },
                { code: "GTQ", name: "Guatemalan Quetzal", flag: "gt" },
                { code: "GYD", name: "Guyanese Dollar", flag: "gy" },
                { code: "HKD", name: "Hong Kong Dollar", flag: "hk" },
                { code: "HNL", name: "Honduran Lempira", flag: "hn" },
                { code: "HRK", name: "Croatian Kuna", flag: "hr" },
               

                { code: "BTN", name: "Bhutanese Ngultrum", flag: "bt" },
                { code: "BWP", name: "Botswana Pula", flag: "bw" },
                { code: "BYN", name: "Belarusian Ruble", flag: "by" },
                { code: "CAD", name: "Canadian Dollar", flag: "ca" },
                { code: "CDF", name: "Congolese Franc", flag: "cd" },
                { code: "CHF", name: "Swiss Franc", flag: "ch" },
                { code: "CLP", name: "Chilean Peso", flag: "cl" },
                { code: "CNY", name: "Chinese Yuan", flag: "cn" },
                { code: "COP", name: "Colombian Peso", flag: "co" },
                { code: "CRC", name: "Costa Rican Colón", flag: "cr" },
                { code: "CUP", name: "Cuban Peso", flag: "cu" },
                { code: "CVE", name: "Cape Verdean Escudo", flag: "cv" },
                { code: "CZK", name: "Czech Koruna", flag: "cz" },
                { code: "DJF", name: "Djiboutian Franc", flag: "dj" },
                { code: "DKK", name: "Danish Krone", flag: "dk" },
                { code: "DOP", name: "Dominican Peso", flag: "do" },
                { code: "DZD", name: "Algerian Dinar", flag: "dz" },
                { code: "EGP", name: "Egyptian Pound", flag: "eg" },
                { code: "ERN", name: "Eritrean Nakfa", flag: "er" },
                { code: "ETB", name: "Ethiopian Birr", flag: "et" },
                { code: "EUR", name: "Euro", flag: "eu" },
                { code: "FJD", name: "Fijian Dollar", flag: "fj" },
                { code: "GBP", name: "British Pound Sterling", flag: "gb" },
                { code: "GEL", name: "Georgian Lari", flag: "ge" },
                { code: "GHS", name: "Ghanaian Cedi", flag: "gh" },
                { code: "GIP", name: "Gibraltar Pound", flag: "gi" },
                { code: "GTQ", name: "Guatemalan Quetzal", flag: "gt" },
                { code: "HKD", name: "Hong Kong Dollar", flag: "hk" },
                { code: "HNL", name: "Honduran Lempira", flag: "hn" },
                { code: "HRK", name: "Croatian Kuna", flag: "hr" },
                { code: "HUF", name: "Hungarian Forint", flag: "hu" },
                { code: "IDR", name: "Indonesian Rupiah", flag: "id" },
                { code: "ILS", name: "Israeli New Shekel", flag: "il" },
                { code: "INR", name: "Indian Rupee", flag: "in" },
                { code: "IQD", name: "Iraqi Dinar", flag: "iq" },
                { code: "IRR", name: "Iranian Rial", flag: "ir" },
                { code: "ISK", name: "Icelandic Króna", flag: "is" },
                { code: "JMD", name: "Jamaican Dollar", flag: "jm" },
                { code: "JOD", name: "Jordanian Dinar", flag: "jo" },
                { code: "JPY", name: "Japanese Yen", flag: "jp" },
                { code: "KES", name: "Kenyan Shilling", flag: "ke" },
                { code: "KGS", name: "Kyrgyzstani Som", flag: "kg" },
                { code: "KHR", name: "Cambodian Riel", flag: "kh" },
                { code: "KMF", name: "Comorian Franc", flag: "km" },
                { code: "KRW", name: "South Korean Won", flag: "kr" },
                { code: "KWD", name: "Kuwaiti Dinar", flag: "kw" },
                { code: "KZT", name: "Kazakhstani Tenge", flag: "kz" },
                { code: "LAK", name: "Lao Kip", flag: "la" },
                { code: "LBP", name: "Lebanese Pound", flag: "lb" },
                { code: "LKR", name: "Sri Lankan Rupee", flag: "lk" },
                { code: "LRD", name: "Liberian Dollar", flag: "lr" },
                { code: "MAD", name: "Moroccan Dirham", flag: "ma" },
                { code: "MDL", name: "Moldovan Leu", flag: "md" },
                { code: "MGA", name: "Malagasy Ariary", flag: "mg" },
                { code: "MKD", name: "Macedonian Denar", flag: "mk" },
                { code: "MMK", name: "Burmese Kyat", flag: "mm" },
                { code: "MNT", name: "Mongolian Tögrög", flag: "mn" },
                { code: "MOP", name: "Macanese Pataca", flag: "mo" },
                { code: "MUR", name: "Mauritian Rupee", flag: "mu" },
                { code: "MVR", name: "Maldivian Rufiyaa", flag: "mv" },
                { code: "MXN", name: "Mexican Peso", flag: "mx" },
                { code: "MYR", name: "Malaysian Ringgit", flag: "my" },
                { code: "NGN", name: "Nigerian Naira", flag: "ng" },
                { code: "NOK", name: "Norwegian Krone", flag: "no" },
                { code: "NZD", name: "New Zealand Dollar", flag: "nz" },
                { code: "OMR", name: "Omani Rial", flag: "om" },
                { code: "PEN", name: "Peruvian Sol", flag: "pe" },
                { code: "PHP", name: "Philippine Peso", flag: "ph" },
                { code: "PKR", name: "Pakistani Rupee", flag: "pk" },
                { code: "PLN", name: "Polish Złoty", flag: "pl" },
                { code: "QAR", name: "Qatari Riyal", flag: "qa" },
                { code: "RUB", name: "Russian Ruble", flag: "ru" },
                { code: "SAR", name: "Saudi Riyal", flag: "sa" },
                { code: "SEK", name: "Swedish Krona", flag: "se" },
                { code: "SGD", name: "Singapore Dollar", flag: "sg" },
                { code: "THB", name: "Thai Baht", flag: "th" },
                { code: "TRY", name: "Turkish Lira", flag: "tr" },
                { code: "TWD", name: "New Taiwan Dollar", flag: "tw" },
                { code: "UAH", name: "Ukrainian Hryvnia", flag: "ua" },
                { code: "USD", name: "United States Dollar", flag: "us" },
                { code: "UYU", name: "Uruguayan Peso", flag: "uy" },
                { code: "VND", name: "Vietnamese Đồng", flag: "vn" },
                { code: "ZAR", name: "South African Rand", flag: "za" },
];

const url="https://api.fxratesapi.com/latest";


app.get("/",(req,res)=>{
   res.render("index.ejs");
});

app.get("/Exchangerates",(req,res)=>{
   res.render("rates.ejs");
});



// 

app.get("/rates", async (req, res) => {
  const userInput = req.query.userInput;

  if (!userInput || typeof userInput !== "string") {
    return res.render("rates.ejs", { msg: "Please enter a valid currency" });
  }

  const currency = userInput.toUpperCase(); 

  if (currencyCodes.includes(currency)) {
    try {
      
      const response = await axios.get(`${url}?base=${currency}`);

      
      const rates = response.data.rates;
      const base = response.data.base;
      const date = response.data.date;

      if (rates && base && date) {
        
        res.render("rates.ejs", { date, base, rates });
      } else {
        res.render("rates.ejs", { error: "Missing required data from API" });
      }

    } catch (error) {
      console.error("Error fetching data from API", error);
      res.status(500).render("rates.ejs", { error: "Server Failed" });
    }
  } else {
    res.render("rates.ejs", { msg: "Please enter a valid currency" });
  }
});



app.get("/Conversion", (req, res) => {
  res.render("convert.ejs");
});



app.get("/convert", async (req, res) => {
  try {
    const fromCurrency = req.query.fromCurrency;
    const toCurrency = req.query.toCurrency;
    const date = req.query.date;
    const amount = req.query.amount;

    console.log(`Converting ${amount} ${fromCurrency} to ${toCurrency} on ${date}`);

    
    const apiUrl = `https://api.fxratesapi.com/convert?from=${fromCurrency}&to=${toCurrency}&date=${date}&amount=${amount}&format=json`;

    console.log("API URL:", apiUrl);

    
    const response = await axios.get(apiUrl);
    console.log("API Response Data:", response.data); 

  
    const data = response.data;

   
    if (!data.success) {
      throw new Error("API response unsuccessful");
    }

    
    res.render("convertedresult.ejs", {
      success: data.success,
      fromCurrency: data.query.from,
      toCurrency: data.query.to,
      amount: data.query.amount,
      rate: data.info.rate,
      result: data.result,
      date: data.date,
    });

  } catch (error) {
    console.error("Error fetching conversion data:", error.message);
    res.status(500).send("Failed to fetch conversion data. Please try again.");
  }
});










app.listen(port,()=>{
     console.log(`The server is listening in port ${port}`);
});





 