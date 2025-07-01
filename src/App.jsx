import React, { useState } from "react";
import "./App.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import Markdown from 'react-markdown'

const App = () => {
  const [screen, setScreen] = useState(1);
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

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
  - Recommendations for improvement
  - Suggested ERP modules or digital tools that would help
  - A final scorecard summary

Respond in a professional, human-friendly report format suitable to be shared with a client.

### Sample Format:

**Executive Summary:**  
(A paragraph summarizing the overall health of the business.)

**Basic Details:**  
(Brief summary of company profile – size, turnover, role, etc.)

**ERP & Digital Tools:**  
(How advanced the tools are, which are missing, and what's recommended.)

**Finance & GST Compliance:**  
(Who handles it, automation level, gaps in compliance or software use.)

**Operational Features:**  
(Use of features like reconciliation, invoicing, user access, etc.)

**Sales & CRM:**  
(Current sales management style, team size, gaps in CRM or lead tracking.)

**Growth Strategy:**  
(Do they plan well? Are KPIs, training, and analytics being used?)

**Trade & Order Management:**  
(Distribution, order processing, inventory syncing, pain points.)

**Perception & Confidence:**  
(Business owner's perception scores – stress, security, productivity.)

**Recommendations:**  
- (List of 4–6 action points, with justification.)
- (Optional ERP modules or third-party tools that can help.)

**Scorecard:**  
Basic: __/20  
ERP: __/44  
Finance: __/47  
Features: __/170  
Sales: __/70  
Strategy: __/30  
Trade: __/117  
Perception: __/50

---

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



`
    });
    console.log(response.text);
    setData(response.text);
    setLoading(false);
  }


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
              <Markdown>{data}</Markdown>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default App;
