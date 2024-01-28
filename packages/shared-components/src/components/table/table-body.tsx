import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TableBodyProps {
  data: any[];
  keys: string[];
  customColumns?: { [key: string]: (object: any) => ReactNode };
  onLineClick?: (object: any) => void;
}
export default function TableBody(props: TableBodyProps) {
  return (
    <tbody className="cursor-pointer">
      <AnimatePresence>
        {props.data.map((line, index) => {
          return (
            <motion.tr
              initial={{ opacity: 0, x: 75 }}
              exit={{ opacity: 0, x: 75 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              onClick={() => {
                props.onLineClick?.(line);
              }}
              className="border-t-4 border-fake-white dark:border-fake-black bg-white dark:bg-dark-gray hover:dark:bg-dark-gray-dimmed shadow-light dark:shadow-dark"
            >
              {props.keys.map((key, i) => {
                if (props.customColumns?.[key]) {
                  return (
                    <td
                      key={key}
                      className={`px-[5px] sm:px-[10px] py-[5px] ${
                        i === 0 ? 'pl-3 sm:pl-5' : ''
                      }`}
                    >
                      <>{props.customColumns[key](line)}</>
                    </td>
                  );
                }
                return (
                  <td
                    key={key}
                    className={`px-[5px] sm:px-[10px] py-[5px] ${
                      i === 0 ? 'pl-3 sm:pl-5' : ''
                    }`}
                  >
                    {line[key]}
                  </td>
                );
              })}
            </motion.tr>
          );
        })}
      </AnimatePresence>
    </tbody>
  );
}
