import "./App.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import Markdown from 'react-markdown'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useState } from "react";


const App = () => {
  const [screen, setScreen] = useState(1);
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDM5D16LsPW_AqYK2pFygw9aSevVzW7h-M",
  });

  async function generateBlogContent() {
    setLoading(true);
    setScreen(2)
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
You are a business consultant AI specialized in ERP diagnostics and operational analysis.

You will be provided with:
1. A list of questions used in an ERP Diagnostic Assessment (including their IDs and text).
2. A corresponding list of user responses to each question (matched by question ID).

Your task is to:
- Analyze the responses across categories like ERP Systems, Finance, Sales, Strategy, Trade, etc.
- Identify strengths and weaknesses.
- Generate a detailed diagnostic report that includes:
  - Executive Summary
  - Category-wise Analysis (Basic Info, ERP Usage, Financial Practices, Features, Sales, Strategy, Trade, Perception)
  - For each category: include two bullet sections titled **What's Working** and **What's Slowing You Down** that summarize the positive and negative aspects respectively
  - Recommendations for improvement
  - Suggested ERP modules or digital tools that would help
  - A final scorecard summary

Respond in a professional, human-friendly report format suitable to be shared with a client.

### Sample Format:


**Executive Summary:**  
(A paragraph summarizing the overall health of the business.)

**Basic Details:**  
(Include company name, location, industry, company size, turnover, and respondent's role.)


Each section should strictly follow this format:

([Section Title]
Current Score: __ / __
Optimal: __
What's Working:
* Point 1
* Point 2
What's Slowing You Down:
* Point 1
* Point 2

What Could Improve:  
- Concrete suggestions, solutions, or upgrades that could boost performance in this section. Mention specific ERP modules or best practices where applicable.
    )
---


**ERP & Digital Tools:**  
(How advanced the tools are, which are missing, and what's recommended.)

**What's Working:**  
- Bullet points highlighting strengths in this section

**What's Slowing You Down:**  
- Bullet points highlighting weaknesses or blockers in this section

**What Could Improve:**  
- Concrete suggestions, solutions, or upgrades that could boost performance in this section. Mention specific ERP modules or best practices where applicable.


**Finance & GST Compliance:**  
(...analysis...)

**What's Working:**  
- ...

**What's Slowing You Down:**  
- ...

**What Could Improve:**  
- ...

(Repeat this format for all sections below)

**Operational Features:**  
...

**Sales & CRM:**  
...

**Growth Strategy:**  
...

**Trade & Order Management:**  
...

**Perception & Confidence:**  
...

**Recommendations:**  
- (List of 4–6 action points, with justification.)
- (Optional ERP modules or third-party tools that can help.)

**Suggested ERP Modules or Third-Party Tools:**  
(Separate list)

**Scorecard:**  
Basic: __/20  
ERP: __/44  
Finance: __/47  
Features: __/170  
Sales: __/70  
Strategy: __/30  
Trade: __/117  
Perception: __/50
----

### Data:
#### Questions (JSON):
{
  "MAS7": {
    "Trading": 0,
    "Manufacturing": 0,
    "Services": 0,
    "Retail": 0
  },
  "MAS8": {
    "<10": 2,
    "10-50": 4,
    "51-200": 7,
    ">200": 10
  },
  "MAS10": {
    "<1 Cr": 2,
    "1-5 Cr": 4,
    "5-10 Cr": 6,
    "10-50 Cr": 7,
    "50-100 Cr": 8,
    "100-200 Cr": 9,
    ">200 Cr": 10
  },
  "EXTSYS1": {
    "Zoho": 9,
    "Tally": 6,
    "SAP": 10,
    "Marg": 5,
    "Busy": 4,
    "Custom-built ERP": 8,
    "Excel/Manual": 2,
    "None": 0,
    "Other (Please specify)": 5
  },
  "EXTSYS2": {
    "Zoho CRM": 9,
    "Salesforce": 10,
    "Sangam CRM": 5,
    "None": 0,
    "Other (Please specify)": 5
  },
  "EXTSYS3": {
    "Zoho People": 9,
    "GreytHR": 8,
    "Keka": 8,
    "None": 0,
    "Other (Please specify)": 5
  },
  "EXTSYS4": {
    "yes": 5,
    "no": 0
  },
  "EXTSYS5": {
    "yes": 5,
    "no": 0
  },
  "EXTSYS6": {
    "yes": 5,
    "no": 0
  },
  "FGST1": {
    "InHouse": 10,
    "Outsourced": 4,
    "Both": 7
  },
  "FGST2": {
    "InHouse": 10,
    "Outsourced": 4,
    "Both": 7
  },
  "FGST3": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FGST4": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FGST5": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS1": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS2": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS3": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS4": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS5": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS6": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS7": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS8": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS9": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS10": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS11": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS12": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS13": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS14": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS15": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS16": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "FTS17": {
    "Using": 10,
    "Not Using": 2,
    "Want to Use": 5,
    "Not Applicable": 0
  },
  "CRMSLS1": {
    "1–5": 2,
    "6–15": 5,
    "16–30": 8,
    ">30": 10
  },
  "CRMSLS2": {
    "Online (Website/Marketplaces)": 8,
    "Offline (Retail/Distributors)": 5,
    "Field Sales": 6,
    "Franchise/Partner Network": 7,
    "Other (Please specify)": 3
  },
  "CRMSLS3": {
    "Website": 2,
    "Social Media": 2,
    "Field Visits": 1,
    "Referrals": 2,
    "Ads (Google, FB, etc.)": 2,
    "Exhibitions": 1,
    "Other (Please specify)": 1
  },
  "CRMSLS4": {
    "Excel": 5,
    "Diary / Paper": 2,
    "CRM software": 10,
    "Not maintained systematically": 0
  },
  "CRMSLS5": {
    "Excel": 5,
    "Mobile contact list": 3,
    "CRM": 10,
    "Do not maintain": 0
  },
  "CRMSLS6": {
    "Telephone": 6,
    "WhatsApp": 8,
    "Email": 10,
    "In-person meeting": 5
  },
  "CRMSLS7": {
    "Yes": 10,
    "No": 0
  },
  "CRMSLS8": {
    "Industry": 3,
    "Location": 2,
    "Revenue": 3,
    "Product Preference": 2,
    "Other (Please specify)": 1
  },
  "CRMSLS9": {
    "Phone Calls": 4,
    "Feedback Forms": 8,
    "Google Reviews": 6,
    "Email Surveys": 10,
    "No specific system": 0,
    "Other (Please specify)": 3
  },
  "BGS1": {
    "No formal strategy": 0,
    "Informal plans": 3,
    "Documented strategy updated annually": 7,
    "Well-communicated strategy with KPIs": 10
  },
  "BGS2": {
    "No": 0,
    "Basic sales or financial reports": 4,
    "Regular data analysis and dashboards": 7,
    "Advanced analytics including predictive models": 10
  },
  "BGS3": {
    "No": 0,
    "Occasional training": 3,
    "Regular training programs": 7,
    "Comprehensive employee development plans": 10
  },
  "TD1": {
    "Direct distribution to customers": 7,
    "Distribution through intermediaries/wholesalers": 6,
    "Hybrid (both direct and intermediaries)": 10
  },
  "TD2A": {
    "Manual processing (phone/email/fax)": 2,
    "Using standalone order management software": 5,
    "Fully integrated ERP system with automated order processing": 10
  },
  "TD2B": {
    "Phone and email communications": 3,
    "Use shared spreadsheets or portals": 6,
    "Fully integrated supplier and intermediary portal via ERP": 10
  },
  "TD2C": {
    "Separate inventory managed manually": 2,
    "Managed through separate software systems": 6,
    "Unified inventory managed through ERP system": 10
  },
  "TD3A1": {
    "Order errors": -2,
    "Delays in order fulfillment": -2,
    "Difficulty tracking order status": -2
  },
  "TD3A2": {
    "Yes, fully integrated": 10,
    "Partially integrated": 5,
    "No integration": 2
  },
  "TD3B1": {
    "Frequently": 2,
    "Sometimes": 5,
    "Rarely": 10
  },
  "TD3B2": {
    "Rarely or never": 2,
    "Occasionally": 5,
    "Real-time or daily updates": 10
  },
  "TD3C1": {
    "Frequently": 2,
    "Occasionally": 5,
    "Rarely": 10
  },
  "TD3C2": {
    "Not integrated": 2,
    "Partially integrated": 5,
    "Fully integrated in ERP system": 10
  },
  "TD4": {
    "Manual stocktaking and recording": 2,
    "Using barcode scanning but manual data entry": 5,
    "Automated inventory management integrated with ERP": 10
  },
  "TD5": {
    "Frequently": 2,
    "Occasionally": 5,
    "Rarely": 10
  },
  "TD6": {
    "Mostly manual procurement process": 2,
    "Use procurement software with limited integration": 5,
    "Fully integrated procurement and supplier management in ERP": 10
  },
  "TD7": {
    "Manual pricing and discount management": 2,
    "Using spreadsheets or standalone tools": 5,
    "Pricing, discounting, and promotions managed via ERP with automation": 10
  },
  "TD8": {
    "Manual tracking and periodic reports": 2,
    "Using standalone reporting tools": 5,
    "Real-time dashboards integrated with ERP": 10
  },
  "TD9": {
    "Not integrated": 2,
    "Partially integrated via manual data transfer": 5,
    "Fully integrated ERP system with automatic data flow": 10
  },
  "PSR1": {
    "1": 2,
    "2": 4,
    "3": 6,
    "4": 8,
    "5": 10
  },
  "PSR2": {
    "1": 2,
    "2": 4,
    "3": 6,
    "4": 8,
    "5": 10
  },
  "PSR3": {
    "1": 2,
    "2": 4,
    "3": 6,
    "4": 8,
    "5": 10
  },
  "PSR4": {
    "1": 2,
    "2": 4,
    "3": 6,
    "4": 8,
    "5": 10
  },
  "PSR5": {
    "1": 2,
    "2": 4,
    "3": 6,
    "4": 8,
    "5": 10
  }
}

#### Response:
${text}

+ At the end of your analysis, include a short, personalized closing message to the client. 
+ This message should:
  - Encourage them with empathy and support.
  - Reassure them that change can be incremental.
  - Mention that help is available without jargon or pressure.
  - Feel human, supportive, and motivating.
+ Example format:
  > You've built [CompanyName] with dedication... This report is not just a checklist. It's a mirror and a map...

`
    });
    
    setData(response.text);
    const rawText = response.text;
    const cleanText = normalizeReportText(rawText);
    const parsed = parseReport(cleanText);
    setParsedData(parsed)
    console.log("the parsed report" + parsed); // You can replace this with setParsedData if needed
    console.log(response.text); // You can replace this with setParsedData if needed
    console.log(cleanText); // You can replace this with setParsedData if needed
    setLoading(false);
    setData(cleanText);

  }


  const normalizeReportText = (text) => {
  return text
    .replace(/[“”]/g, '"') // curly quotes
    .replace(/[‘’]/g, "'") // curly apostrophes
    .replace(/\*\*\s*/g, '') // remove bold
    .replace(/What's Working\s*:?/gi, '\nWhat\'s Working:\n')
    .replace(/What's Slowing You Down\s*:?/gi, '\nWhat\'s Slowing You Down:\n')
    .replace(/\n\s*•/g, '\n*') // normalize bullets
    .replace(/\n\s*-/g, '\n*'); // normalize dashes
};




 const parseReport = (text) => {

  const companyName = parsedData?.basicDetails?.match(/(?:Company\s*Name\s*[:\-]\s*|^)([A-Za-z0-9\s&.,'-]+)/i)?.[1] || "Company Diagnostic Report";
  setCompanyName(companyName)



  const sectionTitles = [
    "ERP & Digital Tools",
    "Finance & GST Compliance",
    "Operational Features",
    "Sales & CRM",
    "Growth Strategy",
    "Trade & Order Management",
    "Perception & Confidence",
  ];

  const extractSection = (label) => {
  const allLabels = [
    "ERP & Digital Tools",
    "Finance & GST Compliance",
    "Operational Features",
    "Sales & CRM",
    "Growth Strategy",
    "Trade & Order Management",
    "Perception & Confidence",
    "Recommendations",
    "Suggested ERP Modules or Third-Party Tools",
    "Scorecard"
  ];

  const nextLabelPattern = allLabels
    .filter((l) => l !== label)
    .map((l) => l.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) // escape regex chars
    .join("|");

  const regex = new RegExp(
    `${label}:\\s*([\\s\\S]*?)(?=\\n(?:${nextLabelPattern}):|\\nScorecard:|\\n?$)`,
    "i"
  );

  const match = text.match(regex);
  return match ? match[1].trim() : "";
};


  const extractPoints = (block) => {
    return block
      .split("\n")
      .filter((line) => line.trim().startsWith("*"))
      .map((line) => line.replace(/^[*-]\s*/, "").trim());
  };

  const extractInsights = (sectionContent) => {
  const workingMatch = sectionContent.match(/What's Working:\s*([\s\S]*?)(?=\n+What's Slowing You Down:|$)/i);
  const slowingMatch = sectionContent.match(/What's Slowing You Down:\s*([\s\S]*?)(?=\n+What Could Improve:|\n+[A-Z][a-z]+|\n*$)/i);
  const improveMatch = sectionContent.match(/What Could Improve:\s*([\s\S]*?)(?=\n+[A-Z][a-z]+|\n*$)/i);

  return {
    working: extractPoints(workingMatch ? workingMatch[1] : "") || [],
    slowing: extractPoints(slowingMatch ? slowingMatch[1] : "") || [],
    improve: extractPoints(improveMatch ? improveMatch[1] : "") || [],
  };
};




  const extractScore = (label) => {
    const match = text.match(new RegExp(`${label}:\\s*(\\d+)\\s*/\\s*(\\d+)`, "i"));
    return match ? { label, score: Number(match[1]), total: Number(match[2]) } : { label, score: 0, total: 0 };
  };

  const extractBlock = (label) => {
    const match = text.match(new RegExp(`${label}:\\s*([\\s\\S]*?)(?=\n[A-Z]|Recommendations:|Scorecard:|$)`, "i"));
    return match ? match[1].trim() : "";
  };

  closingMessage: (() => {
  const match = text.match(/(?:This report isn’t just a checklist|This report is not just a checklist)[\s\S]+?(?=\n[A-Z ]+:|$)/i);
  return match ? match[0].trim() : null;
})()

  const scoreLabels = ['Basic', 'ERP', 'Finance', 'Features', 'Sales', 'Strategy', 'Trade', 'Perception'];

  return {
    executiveSummary: extractBlock("Executive Summary"),
    basicDetails: extractBlock("Basic Details"),
    companyMeta: (() => {
  const block = extractBlock("Basic Details");
  return {
    company: block.match(/Company\s*Name\s*[:\-]?\s*(.*)/i)?.[1] || null,
    location: block.match(/Location\s*[:\-]?\s*(.*)/i)?.[1] || null,
    industry: block.match(/Industry\s*[:\-]?\s*(.*)/i)?.[1] || null,
    size: block.match(/Company\s*Size\s*[:\-]?\s*(.*)/i)?.[1] || null,
    turnover: block.match(/Turnover\s*[:\-]?\s*(.*)/i)?.[1] || null,
    role: block.match(/Role\s*[:\-]?\s*(.*)/i)?.[1] || null,
    raw: block,
  };
})(),
    erpTools: extractSection("ERP & Digital Tools"),
    finance: extractSection("Finance & GST Compliance"),
    features: extractSection("Operational Features"),
    sales: extractSection("Sales & CRM"),
    strategy: extractSection("Growth Strategy"),
    trade: extractSection("Trade & Order Management"),
    perception: extractSection("Perception & Confidence"),
    recommendations: extractBlock("Recommendations"),
    suggestedTools: extractBlock("Suggested ERP Modules or Third-Party Tools"),
    scorecard: scoreLabels.map(label => extractScore(label)),
    insights: Object.fromEntries(sectionTitles.map(label => [label, extractInsights(extractSection(label))]))
  };
};



const insightKeyMap = {
  ERP: "ERP & Digital Tools",
  Finance: "Finance & GST Compliance",
  Features: "Operational Features",
  Sales: "Sales & CRM",
  Strategy: "Growth Strategy",
  Trade: "Trade & Order Management",
  Perception: "Perception & Confidence",
};

const sectionMap = [
  { key: "executiveSummary", title: "Executive Summary" },
  { key: "basicDetails", title: "Basic Details" },
  { key: "erpTools", title: "ERP & Digital Tools", scoreKey: "ERP" },
  { key: "finance", title: "Finance & GST Compliance", scoreKey: "Finance" },
  { key: "features", title: "Operational Features", scoreKey: "Features" },
  { key: "sales", title: "Sales & CRM", scoreKey: "Sales" },
  { key: "strategy", title: "Growth Strategy", scoreKey: "Strategy" },
  { key: "trade", title: "Trade & Order Management", scoreKey: "Trade" },
  { key: "perception", title: "Perception & Confidence", scoreKey: "Perception" },
  { key: "recommendations", title: "Recommendations" },
  { key: "suggestedTools", title: "Suggested ERP Modules or Third-Party Tools" }
];


return (
    <>
      {screen === 1 ? (
        <>
          <div className="container flex flex-col items-center justify-center h-screen">
            <h1 className="text-[40px] font-[700]">
              AI <span className="text-purple-500">Diagnostic</span> Tool
            </h1>
            <textarea
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
              className="w-[50vw] min-h-[30vh] mt-5 bg-transparent border border-[#333333] focus:border-purple-500 outline-none p-[20px] rounded-xl"
              placeholder="Paste Latest Response..."
              ></textarea>
            <button onClick={generateBlogContent} className="btnNormal cursor-pointer transition-all duration-200 active:scale-95 hover:bg-purple-600 hover:scale-105 hover:shadow-md py-[15px] px-[20px] bg-purple-500 text-white rounded-xl border-0 outline-0 mt-6 w-[40vw]">
              Generate
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="container py-[30px] px-[100px]">
            {loading ? (
              <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
              <ClipLoader
                color="#a855f7"
                size={150}
                aria-label="Loading Spinner"
                />
              </div>
            ) : (
              <div>
              <p className="font-bold mb-7 text-[20px] flex items-center gap-[10px]">
                <i
                  onClick={() => {
                    setScreen(1);
                  }}
                  className="cursor-pointer flex flex-col items-center justify-center w-[40px] h-[40px] rounded-[50%] transition-all duration-200 hover:bg-zinc-800"
                  >
                  <IoArrowBackOutline />
                </i>
                Output
              </p>
             

             {/* COMPANY METADATA */}
             {parsedData?.companyMeta && (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-purple-400">
      {parsedData.companyMeta.company || "Company Diagnostic Report"}
    </h1>
    <p className="text-gray-300 mt-2">
      {parsedData.companyMeta.location && <span className="mr-4">📍 {parsedData.companyMeta.location}</span>}
      {parsedData.companyMeta.industry && <span className="mr-4">🏭 {parsedData.companyMeta.industry}</span>}
      {parsedData.companyMeta.size && <span className="mr-4">👥 {parsedData.companyMeta.size}</span>}
      {parsedData.companyMeta.turnover && <span className="mr-4">💰 {parsedData.companyMeta.turnover}</span>}
      {parsedData.companyMeta.role && <span className="mr-4">🧑‍💼 {parsedData.companyMeta.role}</span>}
    </p>
  </div>
)}

              {/* <Markdown
              components={{
                h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-6 mb-2 text-purple-500" {...props} />,
                p: ({ node, ...props }) => <p className="text-base text-gray-100 mb-3" {...props} />,
                li: ({ node, ...props }) => <li className="ml-5 list-disc text-gray-200" {...props} />,
                strong: ({ node, ...props }) => <strong className="text-white font-semibold" {...props} />,
              }}
              >
              {data}
            </Markdown> */}
{/* SCORECARD */}

            {parsedData && (
              <div className="mt-10 bg-zinc-900 p-6 rounded-xl">
    <h2 className="text-purple-500 text-xl font-bold mb-3">Scorecard</h2>
    <ul>
      {parsedData.scorecard.map((score, idx) => (
        <li key={idx} className="text-gray-100 mb-1">
          {score.label}: {score.score} / {score.total}
        </li>
      ))}
    </ul>
  </div>
)}
{/* SCORECARD OVERVIEW*/}
{parsedData && parsedData.scorecard && (() => {
  const high = [], medium = [], low = [];

  parsedData.scorecard.forEach(score => {
    const ratio = score.score / score.total;
    if (ratio > 0.75) high.push(score);
    else if (ratio > 0.5) medium.push(score);
    else low.push(score);
  });

  return (
    <div className="mt-12 bg-zinc-800 p-6 rounded-2xl">
      <h2 className="text-2xl text-purple-500 mb-4">Scorecard Overview</h2>

      <h3 className="text-green-400 font-semibold mt-6 mb-2">High Performing Areas</h3>
      {high.map((score, idx) => (
        <div key={`high-${idx}`} className="mb-4">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-white font-medium">{score.label}</span>
            <span className="text-gray-400">{score.score} / {score.total}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${(score.score / score.total) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}

      <h3 className="text-yellow-400 font-semibold mt-6 mb-2">Moderate Performance</h3>
      {medium.map((score, idx) => (
        <div key={`medium-${idx}`} className="mb-4">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-white font-medium">{score.label}</span>
            <span className="text-gray-400">{score.score} / {score.total}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-3">
            <div
              className="bg-yellow-400 h-3 rounded-full"
              style={{ width: `${(score.score / score.total) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}

      <h3 className="text-red-400 font-semibold mt-6 mb-2">Needs Improvement</h3>
      {low.map((score, idx) => (
        <div key={`low-${idx}`} className="mb-4">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-white font-medium">{score.label}</span>
            <span className="text-gray-400">{score.score} / {score.total}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full"
              style={{ width: `${(score.score / score.total) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
})()}




{parsedData && parsedData.scorecard && (
  <div className="mt-12 bg-zinc-800 p-6 rounded-2xl">
    <h2 className="text-2xl text-purple-500 mb-4">Scorecard Overview</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={parsedData.scorecard}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" stroke="#ccc" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="score" fill="#9F7AEA" />
      </BarChart>
    </ResponsiveContainer>
  </div>
)}



{parsedData && (
  <div className="mt-10 space-y-8">
    {sectionMap.map(({ key, title, scoreKey }) => {
      const content = parsedData[key];
      const score = parsedData.scorecard?.find((s) => s.label.toLowerCase() === scoreKey?.toLowerCase());
      const sectionHasInsight = Object.keys(parsedData.insights || {}).includes(insightKeyMap[scoreKey]);
      const insight = sectionHasInsight ? parsedData.insights[insightKeyMap[scoreKey]] : null;

      const strippedContent = content
        ?.replace(/What's Working:\s*[\s\S]*?(?=What's Slowing You Down:|$)/i, '')
        ?.replace(/What's Slowing You Down:\s*[\s\S]*?(?=What Could Improve:|$)/i, '')
        ?.replace(/What Could Improve:\s*[\s\S]*?(?=\n[A-Z]|$)/i, '')
        ?.trim();

      return content ? (
        <div key={key} className="bg-zinc-900 p-6 rounded-xl shadow-md">
          <h2 className="text-purple-400 text-xl font-bold mb-3">{title}</h2>

          {score && (
            <>
              <div className="text-sm text-gray-300 mb-2">
                <span className="font-semibold text-white">Current Score:</span> {score.score} / {score.total}
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-3 mb-4">
                <div
                  className="bg-purple-500 h-3 rounded-full"
                  style={{ width: `${(score.score / score.total) * 100}%` }}
                ></div>
              </div>
            </>
          )}

          {strippedContent && (
            <p className="text-gray-100 whitespace-pre-line leading-relaxed">{strippedContent}</p>
          )}

          
          {insight && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
    {/* What’s Working */}
    <div>
      <h3 className="text-green-400 font-semibold mb-2">✅ What’s Working</h3>
      <ul className="list-disc list-inside text-gray-200 space-y-1">
        {insight.working.length > 0
          ? insight.working.map((point, idx) => <li key={idx}>{point}</li>)
          : <li className="text-gray-500 italic">No strengths highlighted</li>}
      </ul>
    </div>

    {/* What’s Slowing You Down */}
    <div>
      <h3 className="text-red-400 font-semibold mb-2">⚠️ What’s Slowing You Down</h3>
      <ul className="list-disc list-inside text-gray-200 space-y-1">
        {insight.slowing.length > 0
          ? insight.slowing.map((point, idx) => <li key={idx}>{point}</li>)
          : <li className="text-gray-500 italic">No issues detected</li>}
      </ul>
    </div>

    {/* What Could Improve */}
    <div>
      <h3 className="text-yellow-400 font-semibold mb-2">🔧 What Could Improve</h3>
      <ul className="list-disc list-inside text-gray-200 space-y-1">
        {insight.improve.length > 0
          ? insight.improve.map((point, idx) => <li key={idx}>{point}</li>)
          : <li className="text-gray-500 italic">No improvement points found</li>}
      </ul>
    </div>
  </div>
)}


{parsedData?.closingMessage && (
  <div className="mt-12 bg-purple-900 bg-opacity-20 p-6 rounded-2xl border border-purple-500">
    <h2 className="text-2xl text-purple-400 mb-4 font-semibold">A Note from Your Consultant</h2>
    <p className="text-gray-200 leading-relaxed whitespace-pre-line italic">
      {parsedData.closingMessage}
    </p>
  </div>
)}


        </div>
      ) : null;
    })}
  </div>
)}









              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default App;
