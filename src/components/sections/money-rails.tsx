import { Icon } from '@/components/ui/icon';
import { rails } from '@/content/home';

export function MoneyRails() {
  return (
    <div className="rails">
      <div className="wrap rails-inner">
        <p>{rails.title}</p>
        <ul>
          {rails.items.map((r) => (
            <li key={r.label}>
              <Icon name={r.icon} />
              {r.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
