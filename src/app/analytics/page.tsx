"use client";
import {
  LineChart,
  BarChart,
  PieChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Pie,
  ResponsiveContainer,
} from "recharts";
import { AlertTriangle, DollarSign, CheckCircle } from "lucide-react";
import { useState } from "react";
import { ExploitsTable } from "@/components/table-form";
import { ExploitItem } from "@/types/exploits";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
// Parse the data
const rawData = {
  exploits_data: [
    {
      project_name: "LIBRA",
      name_categories: "Token",
      token_name: "LIBRA",
      proof_archive_link: null,
      technical_issue: null,
      token_address: "Bo9jh3wsmcC2AjakLWzNmKJ3SgtZmXEcSaW7L2FAvUsU",
      proof_link: [
        "https://rekt.news/libra-rugged/",
        "https://www.ccn.com/news/crypto/libra-crash-altcoin-crunch-javier-milei-criminal-charges/",
        "https://www.businessinsider.com/javier-milei-libra-meme-coin-impeachment-calls-trump-argentina-2025-2",
        "https://cointelegraph.com/news/libra-token-insider-trading-javier-milei-scandal",
      ],
      website_link: null,
      webarchive_link: null,
      twitter_link: "https://twitter.com/JMilei",
      telegram_link: null,
      funds_lost: 286000000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exit Scam/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "The LIBRA memecoin collapse wiped out $4.4 billion, leaving 74,000 traders with $286M in losses. Promoted by Argentina’s President Javier Milei, the token surged before insiders rug-pulled. Kelsier Ventures and Hayden Davis orchestrated the scam, with leaked messages suggesting financial leverage over Milei. Argentina’s stock market fell 6%, and Congress is considering impeachment. Milei deleted and reshared his promotions, dismissing concerns. Legal investigations and insider trading evidence continue to unfold.",
          },
          {
            title: "Details of the Exploit",
            content:
              "LIBRA’s collapse followed a classic insider-driven rug pull, where key figures, including Hayden Davis and Kelsier Ventures, pre-mined large token allocations and coordinated promotions through influencers and President Milei to inflate the market cap to $4.4 billion. Insiders began offloading their holdings at the peak, draining liquidity and crashing the price, while on-chain data linked the scam to past fraudulent projects like MELANIA and OG FUN. A high-profile trader, Barstool’s Dave Portnoy, reportedly lost $5.17 million but later received a $5M USDC reimbursement, fueling speculation about insider compensation. Further leaks exposed how Jupiter and Meteora insiders knew about LIBRA’s launch in advance, allowing them to execute sniping trades for millions in illicit profits, leading to criminal fraud charges and political fallout in Argentina.",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2025-02-16",
        display: "February 16, 2025",
        timestamp: 1739664000000,
      },
    },
    {
      project_name: "Fake LAYER",
      name_categories: "Token",
      token_name: null,
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: ["https://x.com/De_FiSecurity/status/1881709380951064657"],
      website_link: null,
      webarchive_link: null,
      twitter_link: null,
      telegram_link: null,
      funds_lost: 465000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exit Scam/Rugpull",
        type: "Rugpull",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "On January 21, 2025, a fake SOLAYER token crashed to nearly zero within three hours after a community alert was raised. Scammer's profit could be estimated as 1,938 WSOL (~$465,000).",
          },
          {
            title: "Details of the Exploit",
            content:
              "The attacker leveraged a fake SOLAYER contract (LAYERruDbdbxZTT4cfFZPRLEoG4cGwn8HpwpgTToWDg) to mislead investors into purchasing worthless tokens. After artificially inflating the token’s perceived value, the attacker made a single significant “rug transaction,” liquidating 17 trillion of these fake tokens in exchange for nearly 2,000 WSOL. Once the attacker’s large sell order cleared, the token’s price plummeted by almost 100% in a matter of hours.",
          },
          {
            title: "Block Data Reference",
            content:
              "Malicious Address: FU2cbiQea7mRX72BhPG716b1Q8eWu62pR2Ue5S9DC8jm Fake Contract: LAYERruDbdbxZTT4cfFZPRLEoG4cGwn8HpwpgTToWDg Rug Transaction: https://solscan.io/tx/4Bio6okCE3qnLk5tEFnP9DQruihadB66vo51DkMBT9MRH6MCSwKSc88TiFJorxXkabb49oLSkgPTjvaHNyb7GRhW",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2025-01-21",
        display: "January 21, 2025",
        timestamp: 1737417600000,
      },
    },
    {
      project_name: "MELANIA",
      name_categories: "Token",
      token_name: "MELANIA",
      proof_archive_link: null,
      technical_issue: null,
      token_address: "FUAfBo2jgks6gB4Z4LfZkqSZgzNucisEHqnNebaRxM1P",
      proof_link: [
        "https://decrypt.co/306226/on-chain-evidence-links-libra-token-to-melania-meme-coin-issuersm",
        "https://cointelegraph.com/news/melania-memecoin-whale-profit-amid-rug-pull-concerns",
        "https://decrypt.co/306498/co-founder-of-crypto-firm-behind-trump-melania-tokens-resigns-amid-insider-trading-allegations",
      ],
      website_link: "https://melaniameme.com/",
      webarchive_link: null,
      twitter_link: "https://x.com/MELANIATRUMP",
      telegram_link: null,
      funds_lost: 200000000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exit Scam/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "The MELANIA memecoin, launched on January 20, 2025, reached a $2 billion market cap within 12 hours, driven by a 25,600% price surge. However, concerns emerged as 90% of the token supply was controlled by a single wallet, raising suspicions of a rug pull. The project’s website was hastily created a day before launch, lacked cybersecurity protections, and showed signs of poor development, leading analysts to doubt its legitimacy.",
          },
          {
            title: "Details of the Exploit",
            content:
              "The MELANIA memecoin launched on January 20, 2025, and rapidly gained attention after being promoted by Melania Trump’s verified X account. The token’s market cap skyrocketed to $2 billion within 12 hours, but concerns soon followed. Blockchain analysis revealed that 90% of the total supply was held in a single wallet, contradicting claims of fair token distribution. The project’s website was created just a day before launch, lacked basic cybersecurity protections, and contained poorly written code, further raising red flags. Additionally, the creator wallet was linked to pump.fun, a Solana-based memecoin launchpad notorious for speculative and predatory projects. These factors fueled suspicions that the project was designed for insiders to manipulate the price, cash out at the peak, and leave retail investors holding worthless tokens.",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2025-01-20",
        display: "January 20, 2025",
        timestamp: 1737331200000,
      },
    },
    {
      project_name: "DEXX",
      name_categories: "Exchange (DEX)",
      token_name: null,
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://x.com/MistTrack_io/status/1857712069233226011",
        "https://www.binance.com/ru-UA/square/post/12-04-2024-dexx-hack-wallet-addresses-of-victims-and-attackers-revealed-17098864242418",
        "https://bravenewcoin.com/insights/dexx-hack-investigation-unveils-over-8600-solana-wallet-links-slowmist-report",
        "https://cointelegraph.com/news/solana-dexx-hack-november-2024-suspicious-wallets",
      ],
      website_link: "https://www.dexx.ai/",
      webarchive_link: null,
      twitter_link: "https://x.com/DEXXai_EN",
      telegram_link: null,
      funds_lost: 21000000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "On November 16, 2024, trading platform DEXX suffered a private key vulnerability exploit, which has now impacted at least 900 unique users across multiple chains (primarily Solana). Initial reports estimated losses at $21 million, but the total has risen to nearly $30 million due to significant price fluctuations in the stolen meme tokens.",
          },
          {
            title: "Details of the Exploit",
            content:
              "The attacker gained unauthorized access to private keys within DEXX’s system, enabling them to redirect user funds into addresses controlled on Solana and other networks. Many users lost less than $10,000, but at least one address reportedly lost over $1 million. In response, DEXX suspended certain services, published warnings, and offered a reward if the stolen funds were returned. Despite these measures, no stolen assets have been recovered. Solana wallets, in particular, have come under increased scrutiny for similar incidents this year, raising broader concerns about private key security and driving ongoing investigations by SlowMist, DEXX, and law enforcement agencies.",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2024-11-16",
        display: "November 16, 2024",
        timestamp: 1731715200000,
      },
    },
    {
      project_name: "Metawin",
      name_categories: "Gaming / Metaverse",
      token_name: null,
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://www.chainabuse.com/report/094193aa-aba7-4af8-b7e6-84f0a6b608db",
        "https://www.binance.com/en/square/post/15757028282945",
        "https://coinmarketcap.com/community/articles/672b2691f33afe7bef2d0a37/",
      ],
      website_link: "https://www.metawin.com/",
      webarchive_link: null,
      twitter_link: "https://x.com/meta_winners?lang=en",
      telegram_link: null,
      funds_lost: 4000000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: "https://discord.com/invite/The-Arena",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Access control",
        type: "Access Control",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "On November 3, 2024, MetaWin, a prominent online crypto casino, suffered a security breach that resulted in the loss of approximately $4 million.",
          },
          {
            title: "Details of the Exploit",
            content:
              'The breach at MetaWin exploited the platform’s instant withdrawal mechanism, which was designed for seamless and rapid transactions. This "frictionless" system inadvertently allowed a hacker to bypass traditional security checks, gaining access to the casino’s Ethereum and Solana hot wallets. Hot wallets, which remain online for quick transaction processing, are inherently more vulnerable, and this became the critical entry point for the attack. Upon detecting the intrusion, MetaWin swiftly disabled withdrawals to secure the system. However, the damage was already done, with over $4 million drained from the platform. The hacker’s method involved targeting addresses directly linked to the withdrawal system, using a sophisticated approach that leveraged over 115 addresses. Blockchain expert ZachXBT collaborated with MetaWin to trace the stolen assets, revealing that the hacker funneled the funds through KuCoin and HitBTC, platforms often utilized for obfuscating the origin of stolen funds.',
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2024-11-03",
        display: "November 3, 2024",
        timestamp: 1730592000000,
      },
    },
    {
      project_name: "Pump.Fun",
      name_categories: "Other",
      token_name: null,
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://x.com/De_FiSecurity/status/1791420812383212014",
        "https://www.theblock.co/post/295270/pump-fun-exploiter-reportedly-arrested-in-london-addresses-scandal-in-x-post",
      ],
      website_link: "https://pump.fun/board",
      webarchive_link: null,
      twitter_link: "https://x.com/pumpdotfun",
      telegram_link: null,
      funds_lost: 2000000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Flash Loan Attack",
        type: "Flash Loan Attack",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "Pump.fun Exploited for ~$2M. 12,300 $SOL were stolen from its contracts, reportedly by project's former team member who had a private key to the service and executed a flash loan attack.",
          },
          {
            title: "Details of the Exploit",
            content:
              "Pump.Fun, a memecoin launchpad, was exploited today through a flashloan attack, resulting in the theft of at least 12,300 SOL, worth roughly $2 million. The attacker leveraged a compromised private key to execute the exploit, where Pump.Fun’s service account cosigned the malicious transactions. Using flashloans from MarginFi, the hacker withdrew liquidity meant to be migrated to Raydium and repaid the flashloan, also donating leftover funds to Solana token holders. The Pump.Fun team managed to upgrade their contracts to prevent further damage and assured that all user wallets and existing tokens on Raydium are secure. Trading on Pump.Fun was temporarily paused but has since resumed, and affected users will receive full liquidity restitution within 24 hours. The platform accused a former employee of exploiting their privileged position to access the withdraw authority, compromising the protocol’s internal systems. The incident has been reported to law enforcement, and the investigation continues.",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2024-05-16",
        display: "May 16, 2024",
        timestamp: 1715817600000,
      },
    },
    {
      project_name: "Condom",
      name_categories: "Token",
      token_name: "Condom",
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://twitter.com/De_FiSecurity/status/1775845174637142024",
      ],
      website_link: null,
      webarchive_link: null,
      twitter_link: null,
      telegram_link: null,
      funds_lost: 900000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exit Scam/Rugpull",
        type: "Rugpull",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "Condom presale raised over $900k and performed exit scam.",
          },
          {
            title: "Details of the Exploit",
            content:
              "On the 4th of April presale performed by the Condom token team was rigged with a profit of 4,965 $SOL. Social media were deleted as well.",
          },
          {
            title: "Block Data Reference",
            content: "Scammer: 4gHb9tUASDRgpe2vdi6Y2jh8mbSqPCmyf1ZvSUcazKSc",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2024-04-04",
        display: "April 4, 2024",
        timestamp: 1712188800000,
      },
    },
    {
      project_name: "Solareum",
      name_categories: "Other",
      token_name: null,
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://twitter.com/decryptmedia/status/1774972570669834660",
        "https://decrypt.co/224371/solana-telegram-trading-bot-shut-down-users-drained-523k",
      ],
      website_link: null,
      webarchive_link: null,
      twitter_link: null,
      telegram_link: null,
      funds_lost: 523000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exit Scam/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "Solareum, a Telegram trading app for Solana tokens, is shutting down after a $523,000 security breach.",
          },
          {
            title: "Details of the Exploit",
            content:
              "The exploit affected over 300 Solana users, with suspicions initially falling on the BONKbot trading bot. However, the BONK team refuted this and provided data indicating that victims had interacted with Solareum. Despite efforts to secure additional funding and enhance security measures, Solareum's closure was prompted by the recent breach and financial constraints. Users on Solareum's Telegram channel are demanding answers and potential compensation, while Decrypt's attempts to reach Solareum for comment remain unanswered.",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2024-04-02",
        display: "April 2, 2024",
        timestamp: 1712016000000,
      },
    },
    {
      project_name: "URF",
      name_categories: "Token",
      token_name: null,
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: ["https://twitter.com/zachxbt/status/1775271634926289053"],
      website_link: null,
      webarchive_link: null,
      twitter_link: null,
      telegram_link: null,
      funds_lost: 450000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exit Scam/Rugpull",
        type: "Rugpull",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "URF, a meme coin presale on Solana, raising around 2400 SOL ($450k). However, the project vanished after launch, with inactive social media since March 26.",
          },
          {
            title: "Details of the Exploit",
            content:
              "@BryceHall's endorsement led to a significant investment in URF's presale, accumulating 2400 SOL ($450k). Yet, the project's team disappeared post-launch, leaving investors without updates. Social media channels have been inactive since March 26.",
          },
          {
            title: "Block Data Reference",
            content:
              "URF presale scammer: 2Y8hZh5on4q9wyqXoNYC8oYPUVQMunrzqW8qDmxup4R8",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2024-03-26",
        display: "March 26, 2024",
        timestamp: 1711411200000,
      },
    },
    {
      project_name: "MangoFarmSOL",
      name_categories: "Yield Aggregator",
      token_name: null,
      proof_archive_link: "https://archive.ph/5oLQt",
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://twitter.com/CertiKAlert/status/1760671575580545481?s=20",
      ],
      website_link:
        "https://ije.gitbook.io/mangofarm.fi-1/general/or-announcements",
      webarchive_link: "https://archive.ph/NRxov",
      twitter_link: "https://twitter.com/MangoFarmSOL",
      telegram_link: "https://t.me/MangoFarmSOL",
      funds_lost: 1297344,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exit Scam/Rugpull",
        type: "Rugpull",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "MangoFarmSOL exit scammed, stealing 1,297,344 USD worth of SOL (13,514 tokens) from users and deleting their website and Twitter account.",
          },
          {
            title: "Details of the Exploit",
            content:
              "MangoFarmSOL, a yield farming protocol on the Solana blockchain, encouraged users to deposit Solana tokens into the protocol to earn airdrops. On January 6, 2024, the project conducted an exit scam, withdrawing a total of 13,514 SOL tokens (worth around 1.29 million USD) deposited by users. The stolen funds primarily consisted of SOL tokens, which were then laundered through various channels, first bridging to the Ethereum network via wormhole and allbridge and then deposited into platforms such as Railgun and eXch. The acquired USDC was bridged from the Solana network to Ethereum via the wormhole bridge. The project subsequently deleted their website and Twitter account.",
          },
          {
            title: "Block Data Reference",
            content:
              "Scammer Address: https://explorer.solana.com/address/FLq2GE2x4kv5UbK6Qw2h9FtBPcLeZnNhwSeGvDDokYbH Additional Scammer Addresses: https://explorer.solana.com/address/8ggviFegLUzsddm9ShyMy42TiDYyH9yDDS3gSGdejND7 https://explorer.solana.com/address/8FNFfU47C2W4kEZv3kJ7r4S4LrUNoB5tJ4NGm2TwdGW6 Funds Withdraw Transaction: https://explorer.solana.com/tx/2HFZyg21afEgKy9NgM7p4TQFzA33ppNWwsSoLyh61wxRFB2ELkpsKPECwu4PrUtRNF3TvmJZbXmQ4thjw3gFcLK9 https://explorer.solana.com/tx/nod1VcqpUm9K5sexbJFyZSfQZpY9qJwgyQGRdtqHMEmjQ1RExtqcdsdqQBQeQ3YKqFbd9Z3YUzJ6s9t3FCFoLJK eXch, Railgun Deposit Transaction: https://etherscan.io/tx/0xe2903d42940795051a2f2ea088a9193742692f95269dbc30d026a688f18f3d17 https://etherscan.io/tx/0xe21d849682fbed06a906dc4dee18ae9fd8386fbc59c76ce65bad9661518ac5dd",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2024-02-06",
        display: "February 6, 2024",
        timestamp: 1707177600000,
      },
    },
    {
      project_name: "Saga DAO",
      name_categories: "Other",
      token_name: null,
      proof_archive_link: "https://archive.ph/kJUzy, https://archive.ph/XbUbA",
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://twitter.com/zkRedDevil/status/1750167015749284306",
        "https://twitter.com/BaerEvo_/status/1750140400038187417",
      ],
      website_link: null,
      webarchive_link: null,
      twitter_link: "https://twitter.com/SagaMobileDAO",
      telegram_link: null,
      funds_lost: 60000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: "https://discord.com/invite/sagadao",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Access control",
        type: "Access Control",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "Saga DAO's founder's wallet was exploited, resulting in 60,000 USD worth of SOL drained from the MultiSig wallet.",
          },
          {
            title: "Details of the Exploit",
            content:
              "Saga DAO, a community-driven project, experienced an access control exploit on January 24, 2024. The attacker allegedly hacked the founder's wallet and drained funds from the MultiSig wallet. Rumors suggest that it might have been an insider attack, as the MultiSig required only one signer out of twelve confirmations. The founder admitted to several security failures, including not using a cold wallet, not checking the threshold of signatures, and not using auto-unlock on Phantom.",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2024-01-24",
        display: "January 24, 2024",
        timestamp: 1706054400000,
      },
    },
    {
      project_name: "Megabot",
      name_categories: "Token",
      token_name: "Megabot",
      proof_archive_link: "https://archive.ph/4cyAW",
      technical_issue: null,
      token_address: "0x201b5B64438843553E3C3671810Ae671C93C685c",
      proof_link: [
        "https://twitter.com/CertiKAlert/status/1739336531213763036?s=20",
      ],
      website_link: null,
      webarchive_link: null,
      twitter_link: null,
      telegram_link: null,
      funds_lost: 666219,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exit Scam/Rugpull",
        type: "Rugpull",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "Megabot token was rugpulled on Dec 25, 2023, causing a total loss of 21.79 WETH and 5662 SOL.",
          },
          {
            title: "Details of the Exploit",
            content:
              "Megabot is an ERC20 token trading on UniSwap. On December 25, 2023, the scammer performed an exit scam by removing liquidity from the LP pool. The majority of funds were lost on the Solana chain. The scammer removed 21.79 WETH and 5662 SOL, totaling approximately 666,219 USD. Following the scam, the associated Twitter and other social media accounts were deleted. The stolen funds were then transferred to another EOA address and distributed among multiple addresses.",
          },
          {
            title: "Block Data Reference",
            content:
              "Deployer Address: https://etherscan.io/address/0xb75014cC69fc3FB0b474179620dA4b8bDba68b78 Scammer's Addresses: https://etherscan.io/address/0x000013De30d1b1D830dcb7d54660F4778D2d4aF5 https://solscan.io/account/8GQyzGgWW3xPVvoDmTUzvv9U7LreyTzXDusQJGDNmEPC Liquidity Removal Transactions: https://etherscan.io/tx/0x692c2b8129d782231d52d5bfa94345eb9d130316376aa8b60c6eeadf8324b237 https://etherscan.io/tx/0x9217b771b3f733f508f5a225a769457ee1ce9da0d2200e29e7d1793d6b1ee5d2 Funds Holders as of Jan 3, 2024: https://etherscan.io/address/0x7E37435EA3f1Fc040Ae60bCD864853031Ae7c7B2 https://solscan.io/account/HPx9BbHD4S5kr977CB5XDKahsC8X9umhtgyaUMpyZ654 <span style='color: rgb(65, 65, 65); font-family: \"Open Sans\", sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;'>https://solscan.io/account/</span>FKZe8RqfvPqC9yNUaZkWGBdGcSXzwAWK6ELRsZ4N1UNp <span style='color: rgb(65, 65, 65); font-family: \"Open Sans\", sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;'>https://solscan.io/account/</span>3fvR3JXnLgBMtnToabfwRgcqLZ1XacZPNRV8wvXtAZVz <span style='color: rgb(65, 65, 65); font-family: \"Open Sans\", sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;'>https://solscan.io/account/</span>Ag3ru48sSeFxJUZjGrhphfYnCsg1kytvmW1dotbibuQU <span style='color: rgb(65, 65, 65); font-family: \"Open Sans\", sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;'>https://solscan.io/account/</span>HfvnEN8AxUczH9hfyibPmsdcFTnQQDLSv7zqb7ebZkMY",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2023-12-25",
        display: "December 25, 2023",
        timestamp: 1703462400000,
      },
    },
    {
      project_name: "Cypher Protocol",
      name_categories: "Exchange (DEX)",
      token_name: null,
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://twitter.com/DeDotFiSecurity/status/1688730259443658752?s=20",
        "https://cointelegraph.com/news/cypher-protocol-solana-hack-exploited-smart-contract",
      ],
      website_link: "https://cypher.trade/",
      webarchive_link: null,
      twitter_link: "https://twitter.com/cypher_protocol",
      telegram_link: "https://t.me/+a4AGL13990cwMTRh",
      funds_lost: 1000000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: "discord.gg/jr9Mu4Uz25",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "Cypher Protocol, a decentralized futures exchange built on the Solana blockchain, was forced to freeze its smart contract after falling victim to an estimated $1 million exploit. The platform's team is actively investigating the incident and attempting to negotiate the return of stolen funds.",
          },
          {
            title: "Details of the Exploit",
            content:
              'On August 7, Cypher Protocol took to X (formerly known as Twitter) to inform its 13,500 followers about a security breach that had led to the suspension of its smart contract. The attack resulted in the pilfering of approximately 38,530 Solana (SOL) tokens and $123,184 USD Coin (USDC), totaling around $1,035,203 in ill-gotten gains. The exploit\'s alleged wallet promptly initiated transfers, including 30,000 USDC sent to Binance\'s Solana USDC address, "kiing.sol," suggesting an attempt to convert the stolen assets. In response to the breach, numerous non-fungible tokens (NFTs) have been dispatched to the suspect\'s wallet, imploring the return of the unlawfully acquired funds. One NFT conveyed a stern message, highlighting the exposure of the attacker\'s actions: "Seriously though, you used Binance and KuCoin to fund and to try and get 30k out. People will find you. Please do the right thing and give the rest back." Another NFT adopted a more direct tone: "give it back you shitlord." Notably, the attacker has yet to move any Solana-based funds to the Ethereum network as of the time of this publication. This incident transpired amidst Cypher Protocol\'s mtnDAO hacker house event, which it co-hosts with fellow Solana protocol Marginfi. Notably, Marginfi emphasized that it remains separate from Cypher and remains unscathed by the breach.',
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2023-08-07",
        display: "August 7, 2023",
        timestamp: 1691366400000,
      },
    },
    {
      project_name: "Raydium",
      name_categories: "Exchange (DEX)",
      token_name: "RAY",
      proof_archive_link: null,
      technical_issue: null,
      token_address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
      proof_link: [
        "https://twitter.com/osec_io/status/1603763023151509505",
        "https://twitter.com/RaydiumProtocol/status/1604251722351710211?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Etweet",
      ],
      website_link: "https://raydium.io/",
      webarchive_link: "https://archive.ph/H5OMP, https://archive.ph/OlMQZ",
      twitter_link: "https://twitter.com/RaydiumProtocol",
      telegram_link: "https://t.me/raydiumprotocol",
      funds_lost: 4400000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Access control",
        type: "Access Control",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              '<p dir="ltr" style="line-height:1.38;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:10.5pt;font-family:Arial;color:#373f47;background-color:#f5f8ff;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"></span> <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:16.5pt;font-family:\'Times New Roman\';color:#343434;background-color:#ffffff;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">The private key of </span><span style="font-size:15pt;font-family:Georgia;color:#292929;background-color:#ffffff;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">the Pool Owner account </span><span style="font-size:16.5pt;font-family:\'Times New Roman\';color:#343434;background-color:#ffffff;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"> was compromised.</span> <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:15pt;font-family:Georgia;color:#292929;background-color:#ffffff;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">The attacker drained nine Raydium’s constant product liquidity pools having stolen crypto worth around 4.4m USD. </span>',
          },
          {
            title: "Details of the Exploit",
            content:
              '<p dir="ltr" style="line-height:1.38;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:10.5pt;font-family:Arial;color:#373f47;background-color:#f5f8ff;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"></span> <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:15pt;font-family:Georgia;color:#292929;background-color:#ffffff;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">The affected pools are ETH-USDC, RAY-SOL, RAY-USDC, RAY-USDT, SOL-USDT, SOL-USDC, stSOL-USDC, UXP-USDC, ZBC-USDC. </span> <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:15pt;font-family:Georgia;color:#292929;background-color:#ffffff;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">The funds draining was performed through repeatedly calling the withdrawPNL function that allows to withdraw fees from the pools. The expected fees to be withdrawn were increased with the SetParams and AmmParams::SyncNeedTake functionality. </span> <p dir="ltr" style="line-height:1.38;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;">',
          },
          {
            title: "Block Data Reference",
            content:
              '<p dir="ltr" style="line-height:1.38;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:10.5pt;font-family:Arial;color:#373f47;background-color:#f5f8ff;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"></span> <p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:15pt;font-family:Georgia;color:#292929;background-color:#ffffff;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">The pool owner account: </span> <a href="https://solscan.io/account/HggGrUeg4ReGvpPMLJMFKV69NTXL1r4wQ9Pk9Ljutwyv" style="text-decoration:none;"><span style="font-size:15pt;font-family:Georgia;color:#1155cc;background-color:#ffffff;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">https://solscan.io/account/HggGrUeg4ReGvpPMLJMFKV69NTXL1r4wQ9Pk9Ljutwyv</span></a><span style="font-size:15pt;font-family:Georgia;color:#292929;background-color:#ffffff;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"> </span>',
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2022-12-16",
        display: "December 16, 2022",
        timestamp: 1671148800000,
      },
    },
    {
      project_name: "Solend",
      name_categories: "Borrowing and Lending",
      token_name: "SLND",
      proof_archive_link: "https://archive.ph/VD3Vm, https://archive.ph/Bd2zt",
      technical_issue: null,
      token_address:
        "https://solscan.io/token/SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp",
      proof_link: [
        "https://www.coindesk.com/business/2022/11/02/defi-protocol-solend-struck-by-126m-oracle-exploit/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        "https://twitter.com/solendprotocol/status/1587671511137398784",
      ],
      website_link: "https://solend.fi/",
      webarchive_link: null,
      twitter_link: "https://twitter.com/solendprotocol",
      telegram_link: null,
      funds_lost: 1260000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: "https://discord.gg/aGXvPNGXDT",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Oracle Issue",
        type: "Oracle Issue",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "Solend protocol was exploited by oracle manipulation. The protocol has suffered 1,260,000 $USD in bad debt.",
          },
          {
            title: "Details of the Exploit",
            content:
              "Solend is a decentralized lending and borrowing protocol. Oracle manipulation exploits happened on the protocol, resulting in a loss of 1,260,000 $USD. COIN98, Stable, and Kamino pools were affected and have been disabled right after the incident.",
          },
          {
            title: "Block Data Reference",
            content:
              "COIN98 Pool: https://solscan.io/account/5twXA9pwa6P3pmKz5NRiviffgGT1bqmf5d1dXVxJL895 Stable Pool: https://solscan.io/account/HZ75yaVXYA4buymgZhzkLoPPyWyRGskg6hWTgkcnsWwL Kamino Pool: https://solscan.io/account/6e72R9KbYrc1RZiXd6ToF7fMyjGLrAf2itqApQyWGWWn",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2022-11-02",
        display: "November 2, 2022",
        timestamp: 1667347200000,
      },
    },
    {
      project_name: "Mango Markets",
      name_categories: "Exchange (DEX)",
      token_name: "MGNO",
      proof_archive_link:
        "https://archive.is/6UYb0, https://archive.is/3MkbT, https://archive.is/zFCFp, https://archive.ph/saYQJ",
      technical_issue: null,
      token_address:
        "https://solscan.io/token/MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac",
      proof_link: [
        "https://www.coindesk.com/markets/2022/10/12/how-market-manipulation-led-to-a-100m-exploit-on-solana-defi-exchange-mango/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        "https://www.bankinfosecurity.com/mango-markets-set-to-pay-47m-bug-bounty-to-hacker-a-20275#:~:text=Decentralized%20finance%20exchange%20Mango%20Markets",
        "https://gerona.ca/alleged-mango-m",
      ],
      website_link: "https://mango.markets/",
      webarchive_link: null,
      twitter_link: "https://twitter.com/mangomarkets",
      telegram_link: null,
      funds_lost: 116000000,
      funds_returned: 69000000,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: "https://discord.gg/2uwjsBc5yw",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "The Mango Markets exchange was exploited by market manipulation. The attacker profited from the total amount of 116,000,000 $USD.",
          },
          {
            title: "Details of the Exploit",
            content:
              "Mango Markets is a DeFi Exchange on the Solana chain. The attacker used two addresses to pump the $MNGO price and used the tokens to take a loan of 116,000,000 $USD from various pools. From the first address, the attacker bought $MNGO tokens for 5,000,000 $USDC and created opened position. From the second address, the same amount of the tokens have been bought and a long position opened for hedging purposes. Consequently, the attacker was able to pump the token price due to little liquidity in the pool. After the accident, the exploiter opened a proposal on MangoDAO for returning the user's deposit funds for immunity, turning Mango users against the DEX. That's also interesting that the attacker's address was funded by an FTX address.",
          },
          {
            title: "Block Data Reference",
            content:
              "Attacker address: https://solscan.io/account/yUJw9a2PyoqKkH47i4yEGf4WXomSHMiK7Lp29Xs2NqM",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2022-10-11",
        display: "October 11, 2022",
        timestamp: 1665446400000,
      },
    },
    {
      project_name: "Solana Slope Wallet",
      name_categories: "Other",
      token_name: null,
      proof_archive_link:
        "https://web.archive.org/web/20220803150907/https://twitter.com/SolanaStatus/status/1554658171934937090, https://web.archive.org/web/20220803150952/https://twitter.com/adamscochran/status/1554644902717169664, https://web.archive.org/web/20220803151347/https://twitter.com/cz_binance/status/1554669764106149892, https://web.archive.org/web/20220803151520/https://twitter.com/zachxbt/status/1554630366379626498, https://web.archive.org/web/20220804115240/https://twitter.com/MiamiVice_sol/status/1554957",
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://www.cnbc.com/2022/08/03/hackers-attack-solana-crypto-stealing-millions.html",
        "https://www.coindesk.com/markets/2022/08/03/phantom-wallet-exploit-drains-millions-in-sol-tokens/",
        "https://techcrunch.com/2022/08/03/solana-wallet-hack/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAACHToES-jkSGGdm2C5QA3IenvVC5xIbhJCO0Espn7z1IHdqn9g9P0J0cSr4vftR6iu-AmRWFOOg0zpkcHOJuPWA2NimMxMhH4vO2Fs04PpCiyrafzbC7RlUMeLwo34NXlzWAMIfQ9BZQ2BX0fHA2A0kr6-BHhdCtrnkPghllnHkr",
      ],
      website_link: "https://solana.com/",
      webarchive_link:
        "https://web.archive.org/web/20220803151642/https://solana.com/",
      twitter_link: "https://twitter.com/Solana",
      telegram_link: "https://t.me/solana",
      funds_lost: 5200000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: "https://github.com/solana-labs",
      git_hub_contract_link: null,
      discord: "https://discord.com/invite/solana",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              'Solana was subjected to a major exploit due to which approximately 8k Slope wallets were robbed in the amount of ~ $5.2M. <strong> Details of the Exploit</strong> <p data-v-51e0c2ec=""><span lang="en">Slope is a web-based, non-custodial crypto wallet and browser extension that allows users to manage assets on the Solana blockchain.</span> Wallets on the Solana chain were compromised by a hacker who managed to gain access to users\' private keys, thanks to which the hacker managed to withdraw funds to his address. The hacker used a proxy to track network requests. Slope Wallet developers used Sentry to transfer data to the network. By default, Sentry does not use 2FA from which it can be concluded that most likely the Sentry Slope account was compromised, and since the data storage period in Sentry is 90 days, and it is possible to track the data of users who created their accounts in this period of time, the hacker gained access to the clean data of users\' wallets such as mnemonic and private key. The vulnerability was also noticed in mobile devices based on android and iOS, most likely the application was written using the Flutter framework, which contains a bug, so the hacker also had access to private user data.',
          },
          {
            title: "Block Data Reference",
            content:
              '<p style="margin:0cm;background:white;"> <p style="margin:0cm;background:white;">Hacker account address: <p style="margin:0cm;background:white;">(SOL) 1) https://solscan.io/account/GeEccGJ9BEzVbVor1njkBCCiqXJbXVeDHaXDCrBDbmuy <p style="margin:0cm;background:white;">(SOL) 2) https://solscan.io/account/5WwBYgQG6BdErM2nNNyUmQXfcUnB68b6kesxBywh1J3n <p style="margin:0cm;background:white;">(SOL) 3) https://solscan.io/account/CEzN7mqP9xoxn2HdyW6fjEJ73t7qaX9Rp2zyS6hb3iEu <p style="margin:0cm;background:white;">(SOL) 4) https://solscan.io/account/Htp9MGP8Tig923ZFY7Qf2zzbMUmYneFRAhSp7vSg4wxV <p style="margin:0cm;background:white;">Address that received 0.5 $SOL from the Binance Hot Wallet on Solana: https://solscan.io/account/HYaQcKPcWgLe7gpA99EUbDSGuzJCupNVCRXmXP37xYXv#solTransfers <p style="margin:0cm;background:white;"> <p style="margin:0cm;background:white;">(ETH) https://etherscan.io/address/0xc611952D81E4ECbd17c8f963123DeC5D7BCe1c27',
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2022-08-03",
        display: "August 3, 2022",
        timestamp: 1659484800000,
      },
    },
    {
      project_name: "Nirvana Finance",
      name_categories: "Stablecoin",
      token_name: "ANA",
      proof_archive_link:
        "https://web.archive.org/web/20220728115606/https://twitter.com/AndyBTC_/status/1552546781929639937, https://web.archive.org/web/20220728115709/https://twitter.com/PeckShieldAlert/status/1552589510986215425",
      technical_issue: null,
      token_address: "ANAxByE6G2WjFp7A4NqtWYXb3mgruyzZYg3spfxe6Lbo",
      proof_link: [
        "https://www.coindesk.com/tech/2022/07/28/solana-defi-protocol-nirvana-drained-of-liquidity-after-flash-loan-exploit/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
        "https://www.yahoo.com/now/solana-defi-protocol-nirvana-drained-114118646.html",
        "https://www.theblock.co/post/159975/solana-stablecoin-nirvana-sinks-90-amid-3-5-million-flash-loan-exploit",
        "https://thelayer.xyz/solana-based-nirvana-suffers-a-flash-loan-attack/",
        "https://coinjournal.net/news/solana-stablecoin-nirvana-dips-90-fo",
      ],
      website_link: "https://www.nirvana.finance/",
      webarchive_link:
        "https://web.archive.org/web/20220707223202/https://www.nirvana.finance/",
      twitter_link: "https://twitter.com/nirvana_fi",
      telegram_link: "https://t.me/nirvanafi",
      funds_lost: 3574635,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: "https://github.com/nirvanadao",
      git_hub_contract_link: null,
      discord: "https://discord.com/invite/Nirvanafi",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Flash Loan Attack",
        type: "Flash Loan Attack",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              '<span data-complaint-target="true" data-complaint-type="fullTextTranslation"><span data-align="0:7">Nirvana</span> <span data-align="8:15">Finance</span> <span data-align="16:21">became</span> the <span data-align="22:23">victim</span> <span data-align="32:41">of</span> a flash loan <span data-align="42:47">attack</span> <span data-align="50:54">during</span> <span data-align="55:62">which</span> the <span data-align="82:93">liquidity</span> <span data-align="77:81">pools of the protocol</span> <span data-align="63:67">were</span> <span data-align="68:76">depleted.</span> <span data-align="106:108">The</span> <span data-align="109:115">Solana-based</span> <span data-align="125:132">Nirvana</span> <span data-align="116:124">protocol</span> <span data-align="133:141">suffered</span> <span data-align="142:148">losses</span> <span data-align="149:150">of</span> <span data-align="151:160">$3.5M.</span></span>',
          },
          {
            title: "<br>Details of the Exploit",
            content:
              "Nirvana is a sustainable mechanism of wealth creation due to the growing minimum price. The $ANA and $NIRV token functioned as a balance between profitability and risk. Nirvana Finance has been subjected to a flash loan attack on the Solana network. The attacker took a flash loan during which he managed to manipulate the price and change the value of $ANA from $8 to $24.27 per transaction. Using the Solend Protocol , the attacker borrowed 10M $USDC which were used for exploiting Nirvana. He minted $ANA in worth of 10M $USDC then swapped $ANA for $USDT taking a profit of $3.5M which then were bridged through the Wormhole Bridge into the Ethereum network. At the moment of this writing all the stolen funds are sitting on the attacker's account.",
          },
          {
            title: "Block Data Reference",
            content:
              '<p style="margin:0cm;background:white;"> <p style="margin:0cm;background:white;">Involved addresses: <p style="margin:0cm;background:white;">Scammer addresses: <p style="margin:0cm;background:white;">(ETH) https://etherscan.io/address/0xb9ae2624ab08661f010185d72dd506e199e67c09 <p style="margin:0cm;background:white;">(Sol) https://solscan.io/account/62o4UiW394cbFXtVHbCyuA7DDeRL26bnpfDDPXpm7PRR <p style="margin:0cm;background:white;">(Sol) https://solscan.io/account/76w4SBe2of2wWUsx2FjkkwD29rRznfvEkBa1upSbTAWH <p style="margin:0cm;background:white;">Nirvana Treasury address (Sol): https://solscan.io/account/CxuuSEv67PzNkMxqCvHeDUr6HKaadoz8NhTfxbQSJnaG <p style="margin:0cm;background:white;"> <p style="margin:0cm;background:white;">Transactions: <p style="margin:0cm;background:white;">Flash-loan: https://solscan.io/tx/LyUnvdY9KBQiVRFqmSzGUfCuPGqYX1xNHCWLWxWZ4MvgLcNis2Kui6T25Ayai5UzpTAFkSRSgriKb3pM8tAoeR5 <p style="margin:0cm;background:white;">Bridging tokens through the Wormhole: <p style="margin:0cm;background:white;">1) https://etherscan.io/tx/0xb5a89c01da58ec7ec8a4b0d0361d8f1719966d4deceaa01efc1362601a76339c <p style="margin:0cm;background:white;">2) https://etherscan.io/tx/0x4ed271840accce70a5da13692db731086293eac934c4741f88e5df1ee4dee49e',
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2022-07-28",
        display: "July 28, 2022",
        timestamp: 1658966400000,
      },
    },
    {
      project_name: "Crema Finance",
      name_categories: "Exchange (DEX)",
      token_name: null,
      proof_archive_link:
        "https://web.archive.org/web/20220703155423/https://twitter.com/Crema_Finance/status/1543416225622941696, https://web.archive.org/web/20220703115222/https://twitter.com/CertiKAlert/status/1543562591749947393, https://web.archive.org/web/20220703070336/https://twitter.com/CertiKAlert/status/1543490434399408129, https://web.archive.org/web/20220704092155/https://twitter.com/Crema_Finance/status/1543638844410499073",
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://www.coindesk.com/tech/2022/07/04/solana-defi-protocol-crema-loses-88m-in-exploit/",
        "https://news.bitcoin.com/exploit-forces-crema-finance-to-temporarily-suspend-services-8-7-million-stolen/",
        "https://www.certik.com/resources/blog/4XzSJEeWC2bRppR9CeBckw-crema-finance-exploit",
        "https://www.binance.com/en/news/flash/7143600",
      ],
      website_link: "https://www.crema.finance/",
      webarchive_link:
        "https://web.archive.org/web/20220613072057/https://www.crema.finance/",
      twitter_link: "https://twitter.com/Crema_Finance",
      telegram_link: "https://t.me/cremafinance",
      funds_lost: 8782446,
      funds_returned: 7356932,
      funds_recovered: 0,
      active: 1,
      git_hub: "https://github.com/CremaFinance",
      git_hub_contract_link: null,
      discord: "https://discord.com/invite/cremafinance",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: "2022-02-03",
          audit_link:
            "safe/files/audit/pdf/624d0ba2e7b2065110733ccb_Crema_Finance_Audit_Bramah.pdf",
          partner: {
            id: 49,
            name: "Bramah Systems",
            logo_link: "safe/files/partner/logo/65f026f54461f.png",
          },
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "Crema Finance was attacked by a white hat hacker for ~$8.8M who then returned the majority of stolen funds, leaving the attacker with 45455 $SOL as a reward for finding the exploit. The Solana network became the place of the exploit, and all funds were transferred by the attacker through the Wormhole Bridge to the ETH network and swapped to 6K $ETH.",
          },
          {
            title: "",
            content:
              '<span lang="en">Crema Finance is a concentrated liquidity protocol that provides superior performance for both traders and liquidity providers on Solana network.</span> The hacker took advantage of the vulnerability of the Crema Finance protocol to withdraw funds from this platform, but after negotiations between Crema Finance and the attacker, they came to an agreement that the hacker would keep 45455 SOL as a reward for finding the vulnerability, and return the remaining funds back to their ETH network address. Exploit step by step: 1) The hacker created a fake Tick account. Tick Account is a special account that stores price tick data in the Crema Finance platform. 2) After creating a fake Tick account, the attacker bypassed the standard check for the owner of the Tick account. The fraudster wrote the initialized address of the Pool Tick to a fake account in this transaction: https://solscan.io/tx/5kfoGgEvhBiHXz1MBVxn8rfJh3cf98m3D64YHE2Q1SsXLiaahvdK4hCJfkMA7jQFXLjP9YdNSTMSor3oXbKrLTev 3) Next, the hacker deployed the contract and used it to provide a flash loan from Solend to add liquidity to Crema to open positions. Contract creations transaction: https://solscan.io/tx/JdorRBPfKNWnZNhWcjwc9Uz5yYaA15CVjT8kLM12tVUqZUu28CqtVEuJ5KpjWHJmVtL7j7sQVhPHHrByhNEKqej 4) Then the hacker used smart contract to lend a flash loan from Solend to add liquidity on Crema Finance to open positions: A) https://solscan.io/tx/5B4QXpMfpDpaX8dg2GF5DVLz9dAiZz1sjPL45wgP7X1o9fpdgCvYKi2FHEosSQBS63uDsos37AyrKC1a4YbKohGv B) https://solscan.io/tx/4FaMTKqha9Uw6hvxg5TQc5W7vRDKxVkfPn5GDMThGYSj3tgyCYSzXzQsAsT3dXDY6yZ26iYieV6bcV7bFDkTZ83W 5) After that, the hacker exchanged tokens for $SOL, some of which are on the Solana account, and the rest was transferred to the ETH blockchain through the Wormhole.',
          },
          {
            title: "Block Data Reference",
            content:
              "Attacker addresses: Solana: https://solscan.io/account/Esmx2QjmDZMjJ15yBJ2nhqisjEt7Gqro4jSkofdoVsvY ETH: https://etherscan.io/address/0x8021b2962db803b73aa874030b0b42c202e8458f Attacker's smart contract: https://solscan.io/account/CiDwX4eMS7hfit1oMHK6MCrgve9HVvgm2PAp7Cz6Bck Contract creation transaction: https://solscan.io/tx/JdorRBPfKNWnZNhWcjwc9Uz5yYaA15CVjT8kLM12tVUqZUu28CqtVEuJ5KpjWHJmVtL7j7sQVhPHHrByhNEKqej Victim address: https://solscan.io/account/Ej4KxxUz73edQzjfsPVWvYxT5eyhQoWoXpo7BYm2Ejhj Attacker returning funds transactions: 1) https://etherscan.io/tx/0xb5935f1fc30921733644de621bb64589f57c650a1985cc5d01c9d24ce03a95bb 2) https://etherscan.io/tx/0xe7bda58d0d0e7ffdbdfd13326da8d26312442e078a86d6458c276ecbfc3a3d3a 3) https://solscan.io/tx/5BxSYVzfaNaKT3HsHGrSze2R4Ue5121e2zJH67u7ncFHqauCzpfm92yk3ULDrtHwt46dF44NwyDC3mYx2cVJDtrS 4) https://solscan.io/tx/5sN74N2Mb9TrbU5LZ5VqyeX5xroeLSaXkWdzzNVbA1sYw7EumvDKBTiRinUdf7esCCz81quoEpGQzsjs6uLWYjJx",
          },
        ],
      },
      audit_status: "Audited",
      date: {
        iso: "2022-07-02",
        display: "July 2, 2022",
        timestamp: 1656720000000,
      },
    },
    {
      project_name: "Cashio",
      name_categories: "Stablecoin",
      token_name: "CASH",
      proof_archive_link: null,
      technical_issue: null,
      token_address:
        "https://explorer.solana.com/address/CASHVDm2wsJXfhj6VWxb7GiMdoLc17Du7paH4bNr5woT",
      proof_link: [
        "https://twitter.com/CashioApp/status/1506571243067224064",
        "https://twitter.com/samczsun/status/1507056110934511619?s=28",
      ],
      website_link: "https://cashio.app/",
      webarchive_link: null,
      twitter_link: "https://twitter.com/CashioApp",
      telegram_link: null,
      funds_lost: 48000000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: "https://github.com/CashioApp/cashio",
      git_hub_contract_link: null,
      discord: "https://discord.com/invite/5Mvhfc8vnX",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "Cashio protocol was exploited due to incorrect collateral validation during minting, which has led to infinite minting.",
          },
          {
            title: "Details of the Exploit",
            content:
              'The validation of the LP tokens is to be deposited via the <u>saber_swap.arrow</u> (USDT-USDC LP) is incomplete, as the mint field is never validated. As a consequence, the hacker was able to deploy a bogus contract that was never verified, followed by a chain of bogus accounts that all passed validation since they were only compared to one another. In addition, in order to pass the <u>common collateral</u> verification, the hacker created a fake bank and was able to instruct the program to mint the original $CASH token because there was no check that the bank\'s token matched the one being minted. After these actions, the hacker minted 2 billion $CASH tokens, and the part of $CASH was burnt to SaberLPTokens. Then another part of the tokens was withdrawn out to $UST and $USDC. The remaining $CASH was swapped for 8,600,000 $UST and 17,000,000 $USDC. Most of the stolen funds were bridged to Ethereum address. The hacker left the message in the transaction "Account with less than 100k have been returned. All other money will be donated to charity."',
          },
          {
            title: "Block Data Reference",
            content:
              "The hacker's address: https://solscan.io/account/6D7fgzpPZXtDB6Zqg3xRwfbohzerbytB2U5pFchnVuzw Validation transaction: https://solscan.io/tx/3t1zqtKk4CgCk5ZDZMGSwdfvvWPekyQ5r8Prhk9MiR5Sw8vujCnFBncAuFCttw3oXzacMRH9ud3VY5virUY2Z39y Mint transaction: https://solscan.io/tx/2X1TKidhbocN5HRLVWRUk8W1YSQH9b6VH7biAm1ad5jwTZNrPSxajz2cyorrvqtUbWUAmCb52Yqk8VxYF2P6H5tP Burning to SaberLPTokens transaction: https://solscan.io/tx/4g5okypEDK9xdDwcootYz86uzTXm41VX7WosiJETGisiG2XpvNgT59djDiD2vwstQtCFF9bqSnViYJGF9Z9QrUvV Withdraw transaction: https://solscan.io/tx/pjUgAeUfWaSSJuw2Cq1cQ9gHNWs8jkxJMtHqVAMuwhg3Uk9LN9Y2obfwt6Qm8bztg56xidWBMytzmqyWzvbsrwH Ethereum address funds were sent: https://etherscan.io/address/0x86766247ba3405c5f15f06b895294200809e9cfb The message hacker left: https://etherscan.io/tx/0xa8394d2e55042f84d096c72dd1075fa2648faf88e248c7992273b4d50a6a647b",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2022-03-23",
        display: "March 23, 2022",
        timestamp: 1647993600000,
      },
    },
    {
      project_name: "Ratz Club",
      name_categories: "NFT",
      token_name: "RATZ",
      proof_archive_link: null,
      technical_issue: null,
      token_address: "GaWA2qKxoqQuv6gdzmNjVnuA2qY3nmo5TBJPSKAy51XK",
      proof_link: [
        "https://ratzclub.medium.com/6-2-a-new-beginning-c2d3e6ae55d2",
      ],
      website_link: "http://ratz-club.com/",
      webarchive_link: null,
      twitter_link: "https://twitter.com/ratz_club?lang=en",
      telegram_link: null,
      funds_lost: 140000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Access control",
        type: "Access Control",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "The Ratz Club project had its SOL wallet emptied by Inexplicable.eth from Sky Labs, resulting in the loss of an undisclosed amount of money.",
          },
          {
            title: "Details of the Exploit",
            content:
              "On a date one and a half days prior to the incident, Inexplicable.eth transferred the entire contents of Ratz Club's SOL wallet to another wallet. The issue could be in malicious approve given previously.",
          },
          {
            title: "Block Data Reference",
            content:
              "The link to the transaction made by Inexplicable.eth can be found at https://solscan.io/account/C9EUZK7JxuGp46DWqr5PSK6BPfeGbZQaEy8YVCKu9Z1u.",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2022-02-07",
        display: "February 7, 2022",
        timestamp: 1644192000000,
      },
    },
    {
      project_name: "Wormhole",
      name_categories: "Bridge",
      token_name: null,
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://twitter.com/wormholecrypto/status/1489001949881978883",
        "https://twitter.com/peckshield/status/1489053988716568577",
        "https://cointelegraph.com/news/wormhole-token-bridge-loses-321m-in-largest-hack-so-far-in-2022",
      ],
      website_link: "https://wormholenetwork.com/",
      webarchive_link:
        "https://web.archive.org/web/20220217184708/https://www.foxbusiness.com/markets/jump-trading-replaces-stolen-wormhole-funds-after-320m-crypto-hack",
      twitter_link: "https://twitter.com/wormholecrypto",
      telegram_link: "https://t.me/wormholecrypto",
      funds_lost: 326000000,
      funds_returned: 326000000,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: "https://discord.com/invite/TsjcDtTPVp",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "The Wormhole bridge was compromised by an attacker that bypassed the verification process and made away with 120,000 $WETH.",
          },
          {
            title: "<br>Details of the Exploit",
            content:
              '<p style="margin:0cm;background:white;"> 1. The attacker minted 120,000 wETH on Solana: https://solscan.io/tx/2zCz2GgSoSS68eNJENWrYB48dMM1zmH8SZkgYneVDv2G4gRsVfwu5rNXtK5BKFxn7fSqX9BvrBc1rdPAeBEcD6Es 2. The attacker redeemed 93,750 wETH for ETH worth $254 million onto the Ethereum: https://etherscan.io/tx/0x24c7d855a0a931561e412d809e2596c3fd861cc7385566fd1cb528f9e93e5f14 3. The hacker used some funds to buy SportX ($SX), Meta Capital ($MCAP), Finally Usable Crypto Karma ($FUCK), and Bored Ape Yacht Club Token ($APE), the example transactions: https://etherscan.io/tx/0x8ab3c4adab6d1a21ec1fcd7dc96523e7dada92d1373ee6919aa6b10b51ebe8d1 https://etherscan.io/tx/0x697869218add15e019f7a1904b7c3b435f9048ec3bcb9c84cf23e64916a41add https://etherscan.io/tx/0x6f17f122dca10e9c894af3766d93e97c08f8925eb3a20b894b810edb3d029ed0 https://etherscan.io/tx/0x57a48345888cbfb2d442f272c6fd9d38f57f6f5608c00c4978860eea7dc927c 4. The remaining wETH was swapped for SOL and USDC on Solana. The hacker’s Solana wallet currently holds 432,662 SOL ($44 million): https://solscan.io/account/CxegPrfn2ge5dNiQberUrQJkHCcimeR4VXkeawcFBBka#splTransfers Probably the issue was in the signature verification process. So it lead to an unverified call by the attacker. Investors were made whole by Jump Trading the mother company behind the wormhole bridge that replenished the stolen ETH.',
          },
          {
            title: "Block Data Reference",
            content:
              '<p style="margin:0cm;background:white;"> The attacker\'s addresses: https://etherscan.io/address/0x629e7da20197a5429d30da36e77d06cdf796b71a https://solscan.io/account/CxegPrfn2ge5dNiQberUrQJkHCcimeR4VXkeawcFBBka',
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2022-02-02",
        display: "February 2, 2022",
        timestamp: 1643760000000,
      },
    },
    {
      project_name: "Solfire",
      name_categories: "Other",
      token_name: "FIRE",
      proof_archive_link: null,
      technical_issue: null,
      token_address: "AfXLBfMZd32pN6QauazHCd7diEWoBgw1GNUALDw3suVZ",
      proof_link: [
        "https://twitter.com/cryptobro888/status/1485302234669891586",
        "https://www.reddit.com/r/solana/comments/sbq3pl/rugpull_solfire/?utm_source=share&utm_medium=ios_app&utm_name=iossmf",
      ],
      website_link: "https://www.solfire.finance/",
      webarchive_link:
        "https://web.archive.org/web/20211124210521/https://www.solfire.finance/",
      twitter_link: "https://twitter.com/Solfirefinance",
      telegram_link: "https://t.me/solfirefinance",
      funds_lost: 4055803,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: "https://github.com/SolfireFinance",
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exit Scam/Rugpull",
        type: "Rugpull",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: null,
            content:
              "Solfire executed rug pull by withdrawing assets from the Solfire hot wallet. Addresses behind the rug pull: https://solscan.io/account/D6RBPLyUYhUE98rWZrewSkpmSDLypGRoGV4EqvGKkvym https://solscan.io/account/8XnyGsVNGFWQ2UYAzwj8gqJsCETMzmbY6ZFTqHpRWfy Funds were stolen from Solfire hot wallet: https://solscan.io/account/4QSQiBquEZXhLJNHNR6CjKEFWkgmtfcbTjdqHZgZErLn The list of stolen funds: - 6.3848 BTC https://solscan.io/tx/4cdwKrEqcv1EB8oXhJw2Udmww8ySkPh7m3RMLFciWSbSE84oDZmRxeDBCR32XeVYWmF8zodpw4sNxrmJbkCwPTc2 - 104.86 soETH https://solscan.io/tx/26AnPkNQ6VQaPJ4qyf1AwumEiSnQkXJpM3dhJe5cSqdcPFTkJjMgfojGXxME8QG6CkwAbFCMWLQMscbcDnNHSs4D - 4,414.47 SOL https://solscan.io/tx/2vEBhU4F5zZjL65JWkc7CFUZamU9rqpEBbPjugEoSLJ8WJGKBWvYWYUUtRapUtS5kFaF6YR3amCqPJhDBB7VaCrt - 1,537,822.99 USDT https://solscan.io/tx/2wcJUbWc4XiCcwrX3sm92XVCxmNEJH27Jo1idJ8N59313BXfqzT8QJj6szeRTekmns9JXjQzbpTKmeR6UFCCky4r - 299,702.9 USDC https://solscan.io/tx/5Q2xciZggPc9Ycmrs7XM33AbtAvTEiCHfBDS2MeSgV3ihYKKAc9nXhJ9r5NX3xnmb7pV8Y6hy6xkgx1SPCipa6bp - 4,030.4 mSOL https://solscan.io/tx/48r9KhG6N7jbK1wjPR2DnSAGjrKkEfXLRwtX5Q7af3jyQ5BKq7K5Y4BaHLMCtWQTwKgi65V9wx3AMZY2fYhkL9Ln - 1,457.89 LUNA https://solscan.io/tx/2roQu6zjy6wCuJK72eQeDHw1ojaA5WwtreYMcSq4okjfsrebXtngsxd5ub3ZZphEy5XFMg8SPjMsGrqU3hJSvSJv - 26,347.69 RAY https://solscan.io/tx/QauQooTafdiW2TqoWA4an7owW3fzCDTzWfuDXxDNz2t5eQAVtf2R1QKxBJ1fwB4SFwSme4zNakNzoaRpmSgc5e9 - 46,110.45 SRM https://solscan.io/tx/zLHjtcwZnGRZfUYqsXF55npe6ebpju2hYfZyPejT8j1dFMuJBu5Q39BPfRgb74z1xtu7wbx6m4EMwZFGLShS8fm - 830,270.48 SBR https://solscan.io/tx/3dVq6Z5kddj51LhPesBz8Un4KD6i7e7MVDDvbLqbnnw93mNwzU1Uh34kS8v38g5MCp9MqmaU33yMyXwKD1Er6D2g Initial gas funding was performed through the following wallet and then funds were bridged to Solana: https://etherscan.io/address/0xe8032c0270164819bbee809324e09d899cc97f18 Stolen funds have arrived in the next wallets: https://etherscan.io/address/0xc5afc6c1d4002dc9bc765542a17bb0fc49044ec5 https://etherscan.io/address/0x1e669254badd2866b217983d6a2fcbbf07d66ff7 Part of stolen funds was deposited into Curve pool: https://etherscan.io/tx/0x6719f05a0c62fa06f513b56fb9276b7b7ac38253960ac5d692c3476bfcadf292 FIRE tokens circulation supply was sent to this address: https://solscan.io/account/3SfihoLDctTc7fna3akRMkVuSFrhBkCzVv6scBJnjQSF#splTransfers The liquidity from the pair was removed at: https://solscan.io/tx/5X8BeUDax4s2k4YywMrp8Dj2EJCiH3RcBw99X51kqfw2yJL3ECqGveuvCyDzaR6a9xGBdShKMaUXdSJKVQgpz57i https://solscan.io/tx/5QeajKs6shGXXPqUB5xxGXhjEXaK9pUvpvwzBBda48bMPzDcdW1UD8a1hhTSkMkQht71Go7hKGP521egKCSMvLo9 https://solscan.io/tx/36GYywPbYSxZcMigk9Ysdoz32kXqUywfJMP8qHgkDt271qhUSkdZWQPr7jWKUpDwwh3jEfH8MARdY7JAARHp7iNf https://solscan.io/tx/39TKL9PyJ7A9FBrgeJZjbYtNGth85vWYpEuNPJ7BLuoNzDMz2aMjSbVHVf8SKcXQe24EyzithHPwKU38DV27951x https://solscan.io/tx/3ugpapQE7JT8U7yrKpidTFW4YhqZ2f9Gpr7QvRFeXmvWC9MLasdy1K7mU8x86VE7LNtx7ZU4daA1NdHXgxjtGczn",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2022-01-23",
        display: "January 23, 2022",
        timestamp: 1642896000000,
      },
    },
    {
      project_name: "Big Daddy Ape Club",
      name_categories: "NFT",
      token_name: null,
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://twitter.com/NFTGurus/status/1480895020098072580",
        "https://markets.businessinsider.com/news/currencies/nft-scam-solana-big-daddy-ape-club-rug-pull-civic-2022-1",
        "https://news.coincu.com/60266-big-daddy-ape-club-1-3m-scam/",
      ],
      website_link: null,
      webarchive_link: null,
      twitter_link: "https://twitter.com/BigDaddyApeClub",
      telegram_link: null,
      funds_lost: 1237622,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exit Scam/Rugpull",
        type: "Rugpull",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: null,
            content:
              "On January 11, scammers staged one of the largest NFT scams in the history of the Solana blockchain. The scammers made off with 9,136 SOL, or about $1.3 mln, in funds sent by would-be collectors to mint the Big Daddy Ape Club NFT. The owners of the Big Daddy Ape Club project were able to abscond with funds despite the fact that the NFT drop was \"verified\" by decentralized identity verification company Civic. Civic now says it's working with law enforcement to find those responsible for the scam. The Big Daddy Ape Club was introduced as a collection of 2,222 monkey-themed NFTs to be minted on the Solana blockchain and listed on the Solanart NFT marketplace. Mert, a software engineer at Coinbase and a Solana researcher said he traced the Solana scammer's wallet, and that some of the funds were transferred to accounts on the Binance crypto exchange. The exchange said it has suspended the accounts and will also be working with law enforcement to investigate. The address behind the case: https://solscan.io/account/C2JoNvhfh4WYLUzDDE4YFeqsMQT3UrexJKfARA1JYYmw",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2022-01-11",
        display: "January 11, 2022",
        timestamp: 1641859200000,
      },
    },
    {
      project_name: "Doodled Dragons",
      name_categories: "NFT",
      token_name: null,
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://web3isgoinggreat.com/?id=2022-01-09-0",
        "https://twitter.com/gt3_btc/status/1479124552479346690?s=21",
      ],
      website_link: null,
      webarchive_link:
        "https://web.archive.org/web/20220106161228/https://twitter.com/DoodledDragons_/status/1479123223543521282",
      twitter_link: null,
      telegram_link: null,
      funds_lost: 30000,
      funds_returned: 0,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exit Scam/Rugpull",
        type: "Rugpull",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: null,
            content:
              "NFT project Doodled Dragons after their fundraising event stated that they will donate $30,000 to WWF. After a few minutes, the person in charge of Doodled Dragons stated that their charity will instead be their personal bank account and deleted their Twitter account: https://web.archive.org/web/20220106161228/https://twitter.com/DoodledDragons_/status/1479123223543521282",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2022-01-06",
        display: "January 6, 2022",
        timestamp: 1641427200000,
      },
    },
    {
      project_name: "Monkey Kingdom",
      name_categories: "NFT",
      token_name: null,
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://twitter.com/MonkeyKingdom_/status/1473312369556213769",
        "https://cointelegraph.com/news/hong-kong-nft-project-monkey-kingdom-loses-1-3m-in-phishing-hack-launches-compensation-fund",
      ],
      website_link: "https://monkeykingdom.io/",
      webarchive_link: null,
      twitter_link: "https://twitter.com/MonkeyKingdom_",
      telegram_link: null,
      funds_lost: 1273618,
      funds_returned: 1273618,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: "https://discord.com/invite/zBBaT3kbNN",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: null,
            content:
              "The attacker's address: https://solscan.io/account/HuiYfmAceFkmhu3yP8t3a6VMYfw3VSX2Ymqqj9M2k9ib Monkey Kingdom's Discord was flooded with thousands of bots impersonating the Monkey Kingdom or Baepes announcements. They DM-ed users directing them to suspicious websites that require them to connect their wallets. When the NFT presale began, the project's announcement channel on Discord was hijacked by the bot named \"Monkey Kingdom\". A Discord webhook got compromised and posted a phishing link to the Announcement channel. The attacker was able to steal 316.8 WETH. Stolen funds were bridged through the Wormhole: https://solscan.io/tx/oUbXHMm158RtzoGD3k5ys3y9SiBovQ1smKWANo1QmX144ovmz9bDsUWyhr3Yp9uEnUVZnnLMgXSxDjFvAVJtBs1 https://solscan.io/tx/47YYx62nvoeuVenY5iT4GA4LYiiNHd9nYmix69rVxw4DZU3FycQWbPy6ePWirMBEDEFfH3a5jW9wjzsuHFtzxz3D https://solscan.io/tx/2pM5asqypGSjJSZjNf6m6MjoQWsc9vFg91UosukpSbZbxwN3BwmaFRnSa3vFERyZBzGDjTTxKD1h1dKkiaPfsjBt https://solscan.io/tx/4MrJuXHeJLH2cBTzYT9Gjbe8pcXvHsRnF5E5ZnpGVkQ7v3gvDEchWVijMSWjwkF1FyxJXV1yjABs4HWh9tcDqaoM",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2021-12-21",
        display: "December 21, 2021",
        timestamp: 1640044800000,
      },
    },
    {
      project_name: "Luna Yield",
      name_categories: "Yield Aggregator",
      token_name: "LUNY",
      proof_archive_link: null,
      technical_issue: null,
      token_address: null,
      proof_link: [
        "https://decrypt.co/79098/solana-defi-protocol-luna-yield-goes-dark-with-6-7-million-in-crypto",
        "https://finance.yahoo.com/news/solana-luna-yield-goes-dark-013219855.html",
        "https://www.coindesk.com/markets/2021/08/20/solanas-luna-yield-goes-dark-with-some-fearing-a-rug-pull-involving-67m/",
      ],
      website_link: "https://www.lunayield.com/",
      webarchive_link: null,
      twitter_link: "https://twitter.com/Luna_Yield",
      telegram_link: null,
      funds_lost: 6709834,
      funds_returned: 4025900,
      funds_recovered: 0,
      active: 1,
      git_hub: null,
      git_hub_contract_link: null,
      discord: null,
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: {
        id: 1002,
        name: "Solana",
        icon_link: "safe/files/network/solana.png",
      },
      scam_type: {
        name: "Exit Scam/Rugpull",
        type: "Rugpull",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: "Quick Summary",
            content:
              "During the Luna Yield IDO event on SolPAD platform, funds were stolen from Luna Yield's address with a loss amounting to around $6.7M in different tokens including SOL, ETH, USDT, and YFI.",
          },
          {
            title: "Details of the Exploit",
            content:
              "After the fundraising event for Luna Yield on SolPAD, the Luna Yield's website was taken down. The funds were stored at an address and were stolen. The stolen Wrapped Ether was distributed between different wallets. Solpad Finance has announced that they have refunded 60% of the stolen funds to the investors.",
          },
          {
            title: "Block Data Reference",
            content:
              "Luna Yield's address: https://solscan.io/account/EiySftqENviEh339R1UhXN2Yxg9wi4ZpVHiRd99SXap7 Distribution of the stolen Wrapped Ether: https://solscan.io/account/EiySftqENviEh339R1UhXN2Yxg9wi4ZpVHiRd99SXap7#splTokenTxs",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2021-08-20",
        display: "August 20, 2021",
        timestamp: 1629417600000,
      },
    },
    {
      project_name: "Solend",
      name_categories: "Borrowing and Lending",
      token_name: "SLND",
      proof_archive_link: null,
      technical_issue: null,
      token_address:
        "https://solscan.io/token/SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp",
      proof_link: [
        "https://twitter.com/solendprotocol/status/1428611597941891082",
      ],
      website_link: "https://solend.fi/",
      webarchive_link: null,
      twitter_link: "https://twitter.com/solendprotocol",
      telegram_link: null,
      funds_lost: 16000,
      funds_returned: 16000,
      funds_recovered: 0,
      active: 1,
      git_hub: "https://github.com/solendprotocol",
      git_hub_contract_link: null,
      discord: "https://discord.com/invite/solend",
      bug_bounty_program_link: null,
      bug_bounty_program_company: null,
      network: null,
      scam_type: {
        name: "Exploit/Other",
        type: "Other",
      },
      auditedBy: [
        {
          date: null,
          audit_link: null,
          partner: null,
        },
      ],
      description: {
        sections: [
          {
            title: null,
            content:
              "An attacker attempted to exploit the Solend smart contract. They subverted an insecure auth check on the <u>UpdateReserveConfig()</u> function to make accounts with borrows liquidatable and set the borrow APY to 250% for all markets. The attempt to steal funds was detected and stopped by the Solend team in time such that no funds were stolen. A handful of users (5) were liquidated by Solend's liquidator, but those users were refunded out of the liquidator's undue earnings (~16K USD). The attacker's address: https://explorer.solana.com/address/5ELHytHM4cvKUPCWX8HPwkwtw3J866Wtexdpo8PPxp2u The attacker submitted a total of 10 txs: 9 of them to So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo (the Solend program address) and one of them to Port7uDYB3wk6GJAw4KT1WpTeMtSu9bTcChBHkX2LfR (the Port program address). The attacker's wallet was funded by 2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S which appears to be an exchange wallet.",
          },
        ],
      },
      audit_status: "Not Audited",
      date: {
        iso: "2021-08-19",
        display: "August 19, 2021",
        timestamp: 1629331200000,
      },
    },
  ],
};
interface ChartExploitsAreaProps {
  exploits?: ExploitItem[] | null;
}

export default function AnalyticsChart({
  exploits = [],
}: ChartExploitsAreaProps) {
  if (!exploits || exploits.length === 0) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Generating Charts</CardTitle>
          <CardDescription>Loading</CardDescription>
        </CardHeader>
        <CardContent className="flex h-auto items-center justify-center">
          <Spinner size="large" />
        </CardContent>
      </Card>
    );
  }
  const exploitsData = exploits;

  // Format currency in millions
  const formatCurrency = (value: any) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(1)}K`;
  };

  // Group scams by type
  const scamTypeData = exploitsData.reduce((acc, curr) => {
    const type = curr.scam_type.type;
    if (!acc[type]) {
      acc[type] = { type, count: 0, totalLost: 0 };
    }
    acc[type].count += 1;
    acc[type].totalLost += curr.funds_lost;
    return acc;
  }, {});

  const scamTypeArray = Object.values(scamTypeData);

  // Format date for the time series
  const timelineData = exploitsData
    .map((item) => ({
      date: new Date(item.date.timestamp).toLocaleDateString(),
      project: item.project_name,
      amount: item.funds_lost,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Prepare data for the recovered vs lost funds chart
  const fundsRecoveryData = exploitsData.map((item) => ({
    name: item.project_name,
    lost: item.funds_lost,
    returned: item.funds_returned,
    recovered: item.funds_recovered,
    total: item.funds_lost - item.funds_returned - item.funds_recovered,
  }));

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedProject, setSelectedProject] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = exploitsData.filter((item) =>
    item.project_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectSelect = (project) => {
    setSelectedProject(project === selectedProject ? null : project);
  };

  const totalLost = exploitsData.reduce(
    (sum, item) => sum + item.funds_lost,
    0
  );
  const totalRecovered = exploitsData.reduce(
    (sum, item) => sum + item.funds_recovered + item.funds_returned,
    0
  );
  const activeScams = exploitsData.filter((item) => item.active === 1).length;

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen bg-gray-100 p-4">
      <header className="bg-white dark:bg-gray-800 dark:shadow-lg shadow rounded-lg p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Exploit Analytics Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Tracking crypto scams and exploits
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full mr-4">
              <DollarSign className="w-6 h-6 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Total Funds Lost
              </p>
              <p className="text-2xl font-bold dark:text-gray-100">
                {formatCurrency(totalLost)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
              <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Total Funds Recovered
              </p>
              <p className="text-2xl font-bold dark:text-gray-100">
                {formatCurrency(totalRecovered)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full mr-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Active Scams
              </p>
              <p className="text-2xl font-bold dark:text-gray-100">
                {activeScams}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
        {/* Funds Lost by Project */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
            Funds Lost by Project
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={fundsRecoveryData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", color: "#111" }}
                  wrapperClassName="dark:bg-gray-800 dark:text-gray-100"
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend
                  wrapperStyle={{ color: "#374151" }}
                  className="dark:text-gray-100"
                />
                <Bar dataKey="lost" fill="#FF8042" name="Funds Lost" />
                {/* <Bar
                  dataKey="recovered"
                  fill="#0088FE"
                  name="Funds Recovered"
                /> */}
                <Bar dataKey="returned" fill="#00C49F" name="Funds Recovered" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scam Types Distribution */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
            Exploit Types Distribution
          </h2>
          <div className="h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={300} height={250}>
                <Pie
                  data={scamTypeArray}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="type"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {scamTypeArray.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", color: "#111" }}
                  wrapperClassName="dark:bg-gray-800 dark:text-gray-100"
                  formatter={(value, name) => [`${value} scams`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Timeline & Project Details */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Timeline */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
            Exploit Timeline
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={1000}
                height={250}
                data={timelineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", color: "#111" }}
                  wrapperClassName="dark:bg-gray-800 dark:text-gray-100"
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend
                  wrapperStyle={{ color: "#374151" }}
                  className="dark:text-gray-100"
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  name="Funds Lost"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project List */}
        <ExploitsTable exploitsData={exploits} />
      </div>

      {/* Selected Project Details */}
      {/* {selectedProject && (
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold mb-4">
            {selectedProject.project_name} Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Summary</h3>
              <p className="text-gray-700 mb-4">
                {selectedProject.description.sections.find(
                  (s) => s.title === "Quick Summary"
                )?.content || "No summary available"}
              </p>

              <h3 className="text-lg font-semibold mb-2">Links</h3>
              <div className="space-y-2">
                {selectedProject.proof_link?.map((link, i) => (
                  <div key={i} className="flex items-center">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {new URL(link).hostname}
                    </a>
                  </div>
                ))}
                {selectedProject.twitter_link && (
                  <div className="flex items-center">
                    <a
                      href={selectedProject.twitter_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Twitter
                    </a>
                  </div>
                )}
                {selectedProject.website_link && (
                  <div className="flex items-center">
                    <a
                      href={selectedProject.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Website
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Details of the Exploit
              </h3>
              <p className="text-gray-700 mb-4">
                {selectedProject.description.sections.find(
                  (s) => s.title === "Details of the Exploit"
                )?.content || "No details available"}
              </p>

              {selectedProject.description.sections.find(
                (s) => s.title === "Block Data Reference"
              ) && (
                <>
                  <h3 className="text-lg font-semibold mb-2">
                    Block Data Reference
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {
                      selectedProject.description.sections.find(
                        (s) => s.title === "Block Data Reference"
                      )?.content
                    }
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
