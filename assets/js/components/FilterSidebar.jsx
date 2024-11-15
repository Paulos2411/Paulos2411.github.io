// components/FilterSidebar.jsx
import React from 'react';
import { X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange, iconTypes }) => {
  if (!isOpen) return null;

  const updateFilters = (category, value) => {
    onFilterChange(prev => {
      const currentFilters = [...prev[category]];
      const index = currentFilters.indexOf(value);
      
      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }

      return {
        ...prev,
        [category]: currentFilters
      };
    });
  };

  const FilterGroup = ({ title, category, options }) => (
    <div className="mb-6">
      <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option} className="flex items-center space-x-2">
            <Checkbox
              checked={filters[category].includes(option)}
              onCheckedChange={(checked) => updateFilters(category, option)}
              className="text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const filterOptions = {
    papers: [
      { label: `${iconTypes.PREPRINT} Preprint`, value: 'preprint' },
      { label: `${iconTypes.PUBLICATION} Publication`, value: 'publication' }
    ],
    codeType: [
      { label: `${iconTypes.REPRODUCIBLE} Reproducible`, value: 'reproducible' },
      { label: `${iconTypes.EVALUATION} Evaluation`, value: 'evaluation' },
      { label: `${iconTypes.RETRACTED} Retracted`, value: 'retracted' },
      { label: `${iconTypes.HUGGINGFACE} HuggingFace`, value: 'huggingface' }
    ],
    // ... other filter options ...
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full md:w-80 bg-white shadow-xl">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold dark:text-white">Apply filters</h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <X className="w-5 h-5 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4">
          <FilterGroup
            title="Papers"
            category="papers"
            options={filterOptions.papers}
          />
          <FilterGroup
            title="Code Type"
            category="codeType"
            options={filterOptions.codeType}
          />
          <FilterGroup
            title="Input Embedding"
            category="inputEmbedding"
            options={['Cells as tokens', 'Ordering', 'Value categorization', 'Value projection']}
          />
          <FilterGroup
            title="Architecture"
            category="architecture"
            options={['Encoder', 'Decoder', 'Encoder-decoder', 'Other']}
          />
          <FilterGroup
            title="Modalities"
            category="modalities"
            options={[
              'scRNA-seq',
              'Bulk/scRNA-seq',
              'DNAm',
              'Proteomics',
              'Natural language annotations',
              'scATAC-seq',
              'CITE-seq',
              'Spatial transcriptomics'
            ]}
          />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={onClose}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;