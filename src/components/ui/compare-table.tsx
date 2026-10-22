import { Check, Minus } from 'lucide-react';
import type { CompareCell, CompareGroup } from '@/content/editions';

interface CompareTableProps {
  groups: readonly CompareGroup[];
  caption: string;
}

function Cell({ cell }: { cell: CompareCell }) {
  if (cell.kind === 'text') return <td className="t">{cell.text}</td>;
  if (cell.kind === 'yes')
    return (
      <td className="y">
        <span className="vh">Included</span>
        <Check aria-hidden="true" strokeWidth={2} />
      </td>
    );
  return (
    <td className="n">
      <span className="vh">Not included</span>
      <Minus aria-hidden="true" strokeWidth={2} />
    </td>
  );
}

export function CompareTable({ groups, caption }: CompareTableProps) {
  return (
    <div className="compare">
      {/* Scrollable region is focusable so keyboard users can scroll it on small screens. */}
      <div className="compare-scroll" tabIndex={0} role="region" aria-label={caption}>
        <table>
          <caption className="vh">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">Lite</th>
              <th scope="col">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => [
              <tr className="grp" key={g.group}>
                <th colSpan={3} scope="colgroup">
                  {g.group}
                </th>
              </tr>,
              ...g.rows.map((r) => (
                <tr key={`${g.group}-${r.feature}`}>
                  <th scope="row">{r.feature}</th>
                  <Cell cell={r.lite} />
                  <Cell cell={r.enterprise} />
                </tr>
              )),
            ])}
          </tbody>
        </table>
      </div>
    </div>
  );
}
