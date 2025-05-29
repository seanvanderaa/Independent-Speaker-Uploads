import json
import os
from dotenv import load_dotenv
from openai import OpenAI

# ---------------------------------------------------------------------
# 1.  Setup - environment & client
# ---------------------------------------------------------------------
load_dotenv()                              # optional: read .env if present
API_KEY = os.getenv("PPLX_API_KEY") or "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"

client = OpenAI(
    api_key=API_KEY,
    base_url="https://api.perplexity.ai"
)

# ---------------------------------------------------------------------
# 2.  Fact-checking helper
# ---------------------------------------------------------------------
def fact_check_claim(claim: str, claimant: str, claim_date: str) -> dict:
    system_prompt = '''
    You are going to be provided with a claim, and it is your job to determine its veracity. When doing this, please examine reputable, unbiased sources and, before answering, list the facts surrounding the claim that are informing your verdict. Once you have done this, please provide a brief summary of the key facts and context, aligning it to whether the claim is correct or incorrect, and then provide a final TRUE/FALSE/MISLEADING/INSUFFICIENT INFORMATION verdict. Do not include this verdict prior to your listing of the facts. You must respond ONLY with a JSON object containing the following keys exactly: claim, verdict (TRUE/FALSE/MISLEADING/INSUFFICIENT INFORMATION ), confidence (score of 1-10 indicating confidence in the verdict), summary (with key facts and context, max 150 words), sources (array of URLs).
    '''

    # --- messages array in correct SDK format ---
    messages = [
        {"role": "system", "content": system_prompt.strip()},
        {
            "role": "user",
            "content": json.dumps(
                {
                    "claim": claim,
                    "claimant": claimant,
                    "claim_date": claim_date,
                }
            ),
        },
    ]

    # --- call Perplexity via OpenAI SDK ---
    response = client.chat.completions.create(
        model="sonar-pro",
        messages=messages,
        #response_format={"type": "json_object"}, <-- This line doesn't work
        web_search_options={"search_context_size": "high"},
    )

    # -----------------------------------------------------------------
    # 3.  Post-process the response the same way as original code
    # -----------------------------------------------------------------
    choice = response.choices[0]
    verdict_obj = json.loads(choice.message.content)

    # If the model returned citations separately, ensure we expose them:
    if not verdict_obj.get("sources") and getattr(choice, "citations", None):
        verdict_obj["sources"] = choice.citations

    return verdict_obj

# ---------------------------------------------------------------------
# 4.  Example use
# ---------------------------------------------------------------------
if __name__ == "__main__":
    claim_example = (
        "AI data centers will require the equivalent of adding an entire "
        "state's worth of power generation just in the next few years alone."
    )
    result = fact_check_claim(
        claim=claim_example,
        claimant="Lauren Boebert",
        claim_date="Apr 17, 2025",
    )
    print(json.dumps(result, indent=2))
