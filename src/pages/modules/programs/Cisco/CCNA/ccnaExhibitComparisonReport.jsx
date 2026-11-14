import { applyNativeExhibit } from "./ccnaCompositeSetQuestions.js";
import { ExhibitDiagram, ExhibitText } from "./ccnaExhibit";
import { CCNA_LEGACY_QUESTIONS } from "./ccnaLegacyQuestions.js";
import { shuffleChoiceIndexes } from "./ccnaExamMatchingUtils.js";
import { CCNA_AFTER_EXHIBITS, getBundledCcnaAfterExhibitImage } from "../../../../../utils/ccnaAfterExhibits.js";
import { matchMode } from "../../../../../utils/ccnaExamGrading.js";

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

const MATCHING_QUESTIONS = CCNA_LEGACY_QUESTIONS
  .filter((question) => question.type === "match" && matchMode(question) === "assign")
  .map((question) => ({
    ...question,
    reportChoiceOrder: shuffleChoiceIndexes(question.choices.length),
  }));

const AFTER_EXHIBIT_REVIEW_IDS = CCNA_AFTER_EXHIBITS
  .filter((entry) => entry.needs_check)
  .map((entry) => entry.question_id);
const MISSING_AFTER_EXHIBIT_IDS = CCNA_AFTER_EXHIBITS
  .filter((entry) => !getBundledCcnaAfterExhibitImage(entry.question_id))
  .map((entry) => entry.question_id);

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

function MatchingBoardPreview({ question, answered }) {
  const choiceOrder = question.reportChoiceOrder;
  const rowCount = question.items.length;
  const rowHeight = 52;
  const headerHeight = 42;
  const boardHeight = headerHeight + rowCount * rowHeight;

  return (
    <div className="matching-preview-board">
      {answered && (
        <svg
          aria-hidden="true"
          className="matching-preview-lines"
          viewBox={`0 0 1000 ${boardHeight}`}
          preserveAspectRatio="none"
        >
          {question.answer.map((choiceIndex, itemIndex) => {
            const displayChoiceIndex = choiceOrder.indexOf(choiceIndex);
            const y1 = headerHeight + rowHeight * (itemIndex + 0.5);
            const y2 = headerHeight + rowHeight * (displayChoiceIndex + 0.5);
            return (
              <g key={itemIndex}>
                <line x1="620" y1={y1} x2="680" y2={y2} />
                <circle cx="620" cy={y1} r="5" />
                <circle cx="680" cy={y2} r="5" />
              </g>
            );
          })}
        </svg>
      )}
      <div className="matching-preview-header">
        <div>Column A</div>
        <div>Column B</div>
      </div>
      {Array.from({ length: rowCount }, (_, rowIndex) => {
        const choiceIndex = choiceOrder[rowIndex];
        return (
          <div className="matching-preview-row" key={rowIndex}>
            <div className="matching-preview-item">
              <span className="matching-preview-number">{rowIndex + 1}.</span>
              <span>{question.items[rowIndex]}</span>
            </div>
            <div className="matching-preview-choice">
              <span className="matching-preview-letter">{String.fromCharCode(65 + rowIndex)}.</span>
              <span>{question.choices[choiceIndex]}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MatchingReportPage({ question }) {
  const recordId = question.legacyIndex ?? question.legacyNumber;
  return (
    <article className="report-page matching-report-page">
      <header className="report-header">
        <div className="report-kicker">CCNA matching-question answer states</div>
        <h1>Matching question · local record {recordId}</h1>
        <p>{question.prompt}</p>
      </header>
      <div className="report-columns">
        <section className="report-panel report-before">
          <h2>Before answering</h2>
          <p className="matching-preview-caption">Choices are shuffled; no matches have been selected.</p>
          <MatchingBoardPreview question={question} answered={false} />
        </section>
        <section className="report-panel report-after">
          <h2>After answering</h2>
          <p className="matching-preview-caption">The completed matches are connected below.</p>
          <MatchingBoardPreview question={question} answered />
        </section>
      </div>
      <footer className="report-footer">
        Local CCNA bank record {recordId}. The after-answer example uses the saved answer mapping; Column B remains shuffled.
      </footer>
    </article>
  );
}

function ReportSummaryPage() {
  const mappedCount = CCNA_AFTER_EXHIBITS.length;
  const imageCount = mappedCount - MISSING_AFTER_EXHIBIT_IDS.length;
  const reviewIds = AFTER_EXHIBIT_REVIEW_IDS.join(", ");

  return (
    <article className="report-page report-summary-page">
      <header className="report-header">
        <div className="report-kicker">Local CCNA review copy</div>
        <h1>CCNA Exhibit and Matching Review</h1>
        <p>Replacement-exhibit inventory and before/after matching-question answer states.</p>
      </header>
      <div className="report-summary-content">
        <section>
          <h2>Exhibit inventory</h2>
          <p><strong>{imageCount} of {mappedCount}</strong> mapped replacement exhibits have an image file.</p>
          <p>{MISSING_AFTER_EXHIBIT_IDS.length
            ? `Replacement images are missing for bank IDs: ${MISSING_AFTER_EXHIBIT_IDS.join(", ")}.`
            : "No replacement images are missing from the mapped after-exhibit inventory."}</p>
          <p><strong>{AFTER_EXHIBIT_REVIEW_IDS.length} entries</strong> are still flagged for source/content verification (not missing image files):</p>
          <p className="report-summary-ids">{reviewIds}</p>
        </section>
        <section>
          <h2>Matching answer states</h2>
          <p><strong>{MATCHING_QUESTIONS.length} one-to-one matching questions</strong> from the local CCNA question bank are shown unanswered and answered. Column B is shuffled in both states.</p>
        </section>
        <section>
          <h2>Scope</h2>
          <p>The exhibit check covers the workspace's mapped replacement images and the candidate gaps already included in this report. A fresh authenticated live-bank review was not run for this update, so unlisted live-bank gaps cannot be ruled out.</p>
          <p>Where source details are incomplete, existing reconstructions remain marked partial or illustrative rather than presenting unknown values as verified.</p>
        </section>
      </div>
      <footer className="report-footer">
        Local review only. The image inventory confirms files are present; review flags still require comparison with their original sources.
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
        .matching-report-page .report-header p { max-height: 1.05in; overflow: hidden; white-space: pre-wrap; }
        .matching-preview-caption { margin: 0 0 0.08in; color: #64748b; font-size: 8px; line-height: 1.35; }
        .matching-preview-board { position: relative; overflow: hidden; border: 1px solid #d6e0ec; border-radius: 6px; background: #fff; }
        .matching-preview-lines { position: absolute; z-index: 1; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
        .matching-preview-lines line { stroke: #287849; stroke-width: 4; stroke-linecap: round; }
        .matching-preview-lines circle { fill: #287849; }
        .matching-preview-header, .matching-preview-row { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr); }
        .matching-preview-header { position: relative; z-index: 2; height: 0.44in; place-items: center; border-bottom: 1px solid #e5eaf1; color: #64748b; font-size: 8px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
        .matching-preview-row { position: relative; z-index: 2; min-height: 0.54in; border-bottom: 1px solid #e5eaf1; }
        .matching-preview-row:last-child { border-bottom: 0; }
        .matching-preview-item, .matching-preview-choice { display: flex; min-width: 0; align-items: center; gap: 0.06in; padding: 0.04in 0.08in; color: #263654; font-size: 8px; line-height: 1.2; }
        .matching-preview-item { border-right: 1px solid #e5eaf1; }
        .matching-preview-number, .matching-preview-letter { flex: 0 0 auto; color: #526584; font-weight: 700; }
        .matching-preview-choice { padding-left: 0.16in; }
        .report-summary-content { display: grid; align-content: start; gap: 0.2in; padding-top: 0.2in; }
        .report-summary-content section { border: 1px solid #d6e0ec; border-radius: 8px; padding: 0.16in; background: #f8fbff; }
        .report-summary-content h2 { margin: 0 0 0.08in; color: #17324a; font-size: 15px; }
        .report-summary-content p { margin: 0 0 0.08in; color: #42516b; font-size: 10px; line-height: 1.4; }
        .report-summary-content p:last-child { margin-bottom: 0; }
        .report-summary-ids { color: #526584 !important; font-size: 8px !important; }
        @media screen {
          .report-page { box-shadow: 0 5px 20px #1e2b441a; }
        }
        @media print {
          html, body, #root { background: #fff; }
          .report-page { margin: 0; box-shadow: none; }
        }
      `}</style>
      <ReportSummaryPage />
      {CANDIDATES.map(([bankId, legacyIndex]) => (
        <ReportPage key={bankId} bankId={bankId} legacyIndex={legacyIndex} />
      ))}
      {LIVE_GAP_CANDIDATES.map((candidate) => (
        <ReportPage key={candidate.bankId} {...candidate} />
      ))}
      {NO_EXHIBIT_ADJUSTMENTS.map((candidate) => (
        <ReportPage key={candidate.bankId} {...candidate} />
      ))}
      {MATCHING_QUESTIONS.map((question) => (
        <MatchingReportPage key={question.legacyIndex} question={question} />
      ))}
    </>
  );
}
