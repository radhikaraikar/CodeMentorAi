import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './Button';

const EmptyState = ({
  icon: Icon,
  emoji,
  title = 'Nothing here yet',
  description = 'Get started by creating something new.',
  actionLabel,
  actionLink,
  onAction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-24 h-24 rounded-3xl bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-6">
        {emoji ? (
          <span className="text-4xl">{emoji}</span>
        ) : Icon ? (
          <Icon className="w-10 h-10 text-slate-500" />
        ) : (
          <span className="text-4xl">📭</span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-slate-400 max-w-sm mb-8">{description}</p>

      {actionLabel && (
        actionLink ? (
          <Link to={actionLink}>
            <Button variant="primary" size="lg">{actionLabel}</Button>
          </Link>
        ) : (
          <Button variant="primary" size="lg" onClick={onAction}>{actionLabel}</Button>
        )
      )}
    </motion.div>
  );
};

export default EmptyState;
