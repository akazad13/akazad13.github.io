import { Wrench } from 'lucide-react';
import { SkillGroup } from '../types/portfolio';
import { IconTile } from './Icons';
import { Section } from './Section';
import { Tags } from './Tags';

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <Section id="skills" title="Skills"
      icon={Wrench} intro="What I use day to day, grouped by the problem it solves.">
      <dl className="divide-y divide-line border-y border-line">
        {groups.map((group) => (
          <div key={group.name} className="grid gap-3 py-5 sm:grid-cols-[11rem_1fr] md:grid-cols-[13rem_1fr] sm:gap-6">
            <dt className="flex items-center gap-3 font-medium">
              <IconTile name={group.icon} size="sm" />
              {group.name}
            </dt>
            <dd className="sm:pt-1">
              <Tags items={group.items} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
