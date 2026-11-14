import { applyNativeExhibit } from "./ccnaCompositeSetQuestions.js";
import { ExhibitDiagram, ExhibitText } from "./ccnaExhibit";
import { CCNA_LEGACY_QUESTIONS } from "./ccnaLegacyQuestions.js";

const CANDIDATES = [
  [71, 387], [161, 478], [225, 542], [252, 570], [260, 578], [281, 599], [285, 603],
  [294, 612], [298, 616], [299, 617], [303, 621], [361, 679], [364, 682], [377, 695],
  [384, 702], [398, 716], [402, 720], [414, 732], [451, 769], [481, 799], [511, 829],
  [518, 836], [563, 881], [570, 888], [583, 901], [593, 911], [619, 935], [633, 949],
  [666, 982], [712, 1028], [760, 1076], [794, 1110], [798, 1114], [810, 1126],
  [827, 1143], [836, 1152], [838, 1154], [854, 1170], [872, 1188], [883, 1199],
  [884, 1200], [890, 1206], [911, 1227], [955, 1245], [973, 1262], [992, 1281],
  [1015, 1304], [1096, 59], [1197, 160], [1254, 215], [1330, 291],
];

const LIVE_GAP_CANDIDATES = [
  [24, "SW11 voice/data VLAN assignment; endpoint-to-port mapping and VLAN IDs were absent."],
  [29, "Permit traffic from G0/0 and deny traffic from Gi0/1; address and topology details were absent."],
  [66, "Configure SW1 Gi1/1 for voice and data; VLAN IDs were absent."],
  [82, "Limit Router A CDP visibility to Router C; topology and interface IDs were absent."],
  [159, "Configure IPv6 reachability from R17 to R18's WAN interface; address details were absent."],
  [169, "R5 neighbor-discovery settings and R6 Gi0/2 address; source output was absent."],
  [198, "SW1/SW2 LACP EtherChannel with PC connectivity; member-port details were absent."],
  [557, "Assign each router the last usable address in its subnet; subnet/interface values were absent."],
  [703, "Block PC2 access to the file server while allowing other hosts; ACL path and addresses were absent."],
  [832, "Identify routes installed on Router 2; neighbor topology and routing data were absent."],
  [924, "Verify Workstation 1 settings for Server 1 FQDN access; IP and DNS values were absent."],
].map(([bankId, summary]) => ({
  bankId,
  summary,
  beforeNote: "The authenticated live row checked on 2026-11-14 had no image URL or inline exhibit payload. Unknown values remain marked instead of being invented.",
}));

const NO_EXHIBIT_ADJUSTMENTS = [
  {
    bankId: 491,
    summary: "Router R4 remote-access requirements are stated in the prompt; no separate diagram is needed.",
    beforeNote: "The live row had no image. The local image mapping pointed to unrelated DHCP-snooping output.",
    qualityLabel: "No new exhibit added; the prompt is self-contained and the unrelated image is suppressed.",
    afterNote: "No exhibit required. The stale “Refer to the exhibit” lead-in is removed, and the unrelated local image is hidden.",
  },
];

const QUALITY_LABELS = {
  illustrative: "Illustrative only; original values were unavailable.",
  partial: "Partial reconstruction; only source-supported details are shown.",
  "source-backed": "Reconstructed from source content; unrelated fields were omitted.",
};

function renderExhibit(question) {
  const exhibits = [];
  if (question.exhibitDiagram) {
    exhibits.push(<ExhibitDiagram key="diagram" type={question.exhibitDiagram} className="report-exhibit" />);
  }
  if (question.exhibit) {
    exhibits.push(<ExhibitText key="text" text={question.exhibit} className="report-exhibit" />);
  }
  if (exhibits.length) return <div>{exhibits}</div>;
  if (question.items && question.choices) {
    return (
      <div className="report-match">
        <p>Matching activity restored from the local answer record.</p>
        {question.items.map((item, index) => (
          <div className="report-match-row" key={`${index}-${item}`}>
            <strong>{item}</strong>
            <span>{question.choices.join(" | ")}</span>
          </div>
        ))}
      </div>
    );
  }
  return <p className="report-unavailable">No native exhibit could be rendered from the local record.</p>;
}

function ReportPage({ bankId, legacyIndex, summary, beforeNote, qualityLabel, afterNote }) {
  const legacyQuestion = CCNA_LEGACY_QUESTIONS.find((question) => question.legacyIndex === legacyIndex);
  if (!legacyQuestion && !summary) {
    return (
      <article className="report-page">
        <h1>Question bank ID {bankId}</h1>
        <p>Legacy source record {legacyIndex} was not found.</p>
      </article>
    );
  }

  const sourceQuestion = legacyQuestion
    ? { ...legacyQuestion, bankId }
    : { bankId, prompt: summary };
  const question = applyNativeExhibit(sourceQuestion);
  const prompt = legacyQuestion
    ? legacyQuestion.prompt
      .replace(/^\s*Refer to (?:the )?exhibit\.?\s*/i, "")
      .replace(/\s+/g, " ")
      .trim()
    : summary;
  const quality = qualityLabel ?? (question.exhibitQuality
    ? QUALITY_LABELS[question.exhibitQuality] ?? "Reconstructed exhibit."
    : legacyQuestion
      ? "Native exhibit already existed in the local project."
      : "Reconstructed from the details available in the live row.");

  return (
    <article className="report-page">
      <header className="report-header">
        <div className="report-kicker">CCNA exhibit restoration · local review copy</div>
        <h1>Question bank ID {bankId}</h1>
        <p>{prompt}</p>
      </header>
      <div className="report-columns">
        <section className="report-panel report-before">
          <h2>Before</h2>
          <p className="report-missing">{beforeNote ?? "No source exhibit was verified for this candidate in the local export."}</p>
          <p className="report-footnote">Images were not attached by filename alone because several numbered files do not match their mapped prompts.</p>
        </section>
        <section className="report-panel report-after">
          <h2>After</h2>
          <p className="report-quality">{quality}</p>
          {afterNote ? <p className="report-no-exhibit">{afterNote}</p> : renderExhibit(question)}
        </section>
      </div>
      <footer className="report-footer">
        The original 51 candidates came from an October export. The live bank was checked on 2026-11-14; 46 of those rows had image URLs and five contained inline exhibit text, but attached images were not visually verified. New pages are local-only reconstructions from rows without image or inline exhibit data. No live records were changed.
      </footer>
    </article>
  );
}

export default function CcnaExhibitComparisonReport() {
  return (
    <>
      <style>{`
        @page { size: landscape; margin: 0.35in; }
        html, body, #root { margin: 0; min-height: 100%; background: #e8edf4; }
        .report-page {
          box-sizing: border-box;
          width: 10.3in;
          height: 7.8in;
          margin: 0 auto 1rem;
          padding: 0.22in;
          overflow: hidden;
          background: #fff;
          color: #17233d;
          page-break-after: always;
          break-after: page;
          display: flex;
          flex-direction: column;
          font-family: Arial, sans-serif;
        }
        .report-header { border-bottom: 2px solid #d6e5e7; padding-bottom: 0.1in; }
        .report-kicker { color: #526584; font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
        .report-header h1 { margin: 0.04in 0; font-size: 21px; }
        .report-header p { margin: 0; max-width: 100%; font-size: 10px; line-height: 1.35; }
        .report-columns { display: grid; flex: 1; min-height: 0; grid-template-columns: 1fr 1fr; gap: 0.16in; padding-top: 0.12in; }
        .report-panel { box-sizing: border-box; min-width: 0; overflow: hidden; border: 1px solid #d6e0ec; border-radius: 8px; padding: 0.12in; }
        .report-panel h2 { margin: 0 0 0.06in; color: #17324a; font-size: 13px; }
        .report-before { background: #f7f9fc; }
        .report-after { background: #f8fbff; }
        .report-missing { margin: 0.2in 0 0; padding: 0.12in; border: 1px dashed #aab9ca; color: #526584; font-size: 11px; line-height: 1.5; }
        .report-footnote, .report-quality { color: #64748b; font-size: 8px; line-height: 1.35; }
        .report-quality { margin: 0 0 0.08in; }
        .report-footer { padding-top: 0.07in; color: #64748b; font-size: 7px; }
        .report-exhibit { max-width: 100% !important; }
        .report-exhibit pre { max-height: 4.8in !important; overflow: hidden !important; font-size: 8px !important; line-height: 1.25 !important; }
        .report-exhibit section { margin-bottom: 0.04in !important; }
        .report-exhibit button { display: none !important; }
        .report-match { overflow: hidden; border: 1px solid #d6e0ec; border-radius: 6px; background: #fff; font-size: 8px; }
        .report-match > p { padding: 0.08in; color: #64748b; }
        .report-match-row { display: grid; grid-template-columns: 1fr 1.3fr; gap: 0.08in; border-top: 1px solid #e6ecf3; padding: 0.07in; }
        .report-match-row span { color: #526584; }
        .report-unavailable { padding: 0.1in; border: 1px dashed #aab9ca; color: #526584; font-size: 10px; }
        .report-no-exhibit { margin: 0.2in 0 0; padding: 0.14in; border: 1px dashed #aab9ca; border-radius: 6px; color: #526584; font-size: 10px; line-height: 1.5; }
        @media screen {
          .report-page { box-shadow: 0 5px 20px #1e2b441a; }
        }
        @media print {
          html, body, #root { background: #fff; }
          .report-page { margin: 0; box-shadow: none; }
        }
      `}</style>
      {CANDIDATES.map(([bankId, legacyIndex]) => (
        <ReportPage key={bankId} bankId={bankId} legacyIndex={legacyIndex} />
      ))}
      {LIVE_GAP_CANDIDATES.map((candidate) => (
        <ReportPage key={candidate.bankId} {...candidate} />
      ))}
      {NO_EXHIBIT_ADJUSTMENTS.map((candidate) => (
        <ReportPage key={candidate.bankId} {...candidate} />
      ))}
    </>
  );
}
