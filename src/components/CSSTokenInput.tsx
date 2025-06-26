import React, { useCallback } from 'react';
import { Palette, Sparkles, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FigmaToken } from '@/types';

interface CSSTokenInputProps {
  onTokensParsed: (tokens: FigmaToken[]) => void;
  isLoading: boolean;
}

export const CSSTokenInput: React.FC<CSSTokenInputProps> = ({ onTokensParsed, isLoading }) => {
  const [cssInput, setCssInput] = React.useState('');
  const [parsedTokens, setParsedTokens] = React.useState<FigmaToken[]>([]);

  const parseCSSCustomProperties = useCallback((cssText: string): FigmaToken[] => {
    const tokens: FigmaToken[] = [];
    
    // Split by lines and process each line
    const lines = cssText.split('\n');
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Match CSS custom property pattern: --property-name: value;
      const match = trimmedLine.match(/^--([^:]+):\s*([^;]+);?$/);
      
      if (match) {
        const [, name, value] = match;
        let cleanName = name.trim();
        const cleanValue = value.trim();
        
        // Convert colour/colors to color and ensure proper format
        cleanName = cleanName.replace(/colours?-/, 'color-');
        
        // Determine token type based on value
        let type = 'other';
        if (cleanValue.startsWith('#') || cleanValue.startsWith('rgb') || cleanValue.startsWith('hsl')) {
          type = 'color';
        } else if (cleanName.includes('radius')) {
          type = 'radius';
        } else if (cleanName.includes('spacing')) {
          type = 'spacing';
        }
        
        tokens.push({
          name: cleanName,
          value: cleanValue,
          type,
          description: `CSS custom property: --${cleanName}`,
        });
      }
    });
    
    return tokens;
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setCssInput(value);
    
    if (value.trim()) {
      try {
        const tokens = parseCSSCustomProperties(value);
        setParsedTokens(tokens);
        onTokensParsed(tokens);
      } catch (error) {
        console.error('Error parsing CSS:', error);
        setParsedTokens([]);
      }
    } else {
      setParsedTokens([]);
      onTokensParsed([]);
    }
  }, [parseCSSCustomProperties, onTokensParsed]);

  const colorTokensCount = parsedTokens.filter(token => token.type === 'color').length;
  const totalTokensCount = parsedTokens.length;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <Label htmlFor="css-tokens" className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
          <Code className="h-5 w-5 text-blue-400" />
          <span>Theme Colours</span>
        </Label>
        
        <Card className="glass-dark border-slate-700/50 p-6">
          <Textarea
            id="css-tokens"
            placeholder="Paste your CSS custom properties here...

Example:
--color-neutral-900: #000000;
--color-orange-500: #ED630D;
--color-blue-500: #2563EB;
--color-white-500: #FFFFFF;
--color-gray-300: #D1D5DB;"
            value={cssInput}
            onChange={(e) => handleInputChange(e.target.value)}
            className="min-h-[300px] bg-slate-900/50 border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 text-slate-100 placeholder:text-slate-500 font-mono text-sm resize-none"
            disabled={isLoading}
          />
        </Card>
        
        <p className="text-slate-400 text-sm">
          Paste CSS custom properties in the format <code className="bg-slate-800 px-2 py-1 rounded text-slate-300">--color-name-shade: value;</code>
        </p>
      </div>

      {/* Parsing Results */}
      {totalTokensCount > 0 && (
        <Card className="glass-dark border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-lg" />
                <div className="relative p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-slate-200">Tokens Parsed Successfully</h4>
                <p className="text-slate-400">
                  Found {totalTokensCount} tokens ({colorTokensCount} colors)
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-2 rounded-lg">
                <Palette className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-300">{colorTokensCount} Colors</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-2 rounded-lg">
                <Code className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-slate-300">{totalTokensCount} Total</span>
              </div>
            </div>
          </div>
          
          {/* Token Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
            {parsedTokens.slice(0, 12).map((token) => (
              <div
                key={token.name}
                className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50"
              >
                {token.type === 'color' ? (
                  <div 
                    className="w-6 h-6 rounded-lg border border-slate-600 shadow-sm flex-shrink-0" 
                    style={{ backgroundColor: token.value }}
                    title={token.value}
                  />
                ) : (
                  <div className="w-6 h-6 rounded-lg border border-dashed border-slate-600 flex-shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-slate-500 rounded-full" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <code className="text-xs font-mono text-slate-300 block truncate">
                    {token.name}
                  </code>
                  <span className="text-xs text-slate-500 block truncate">
                    {token.value}
                  </span>
                </div>
              </div>
            ))}
            {parsedTokens.length > 12 && (
              <div className="flex items-center justify-center p-3 bg-slate-800/20 rounded-lg border border-dashed border-slate-700">
                <span className="text-sm text-slate-400">
                  +{parsedTokens.length - 12} more tokens
                </span>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};