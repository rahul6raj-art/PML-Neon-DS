import { type SVGProps, type FC, useState, useEffect } from 'react';

const svgModules = import.meta.glob<{ default: FC<SVGProps<SVGSVGElement>> }>(
  '../../../icons/svg/glyphs/*.svg',
  { query: '?react' }
);

function filePathToName(path: string): string {
  const file = path.split('/').pop() ?? '';
  return file.replace('.svg', '');
}

export const iconNames: string[] = Object.keys(svgModules)
  .map(filePathToName)
  .sort();

const cache = new Map<string, FC<SVGProps<SVGSVGElement>>>();

function findModulePath(name: string): string | undefined {
  return Object.keys(svgModules).find((p) => filePathToName(p) === name);
}

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Icon name matching a file in icons/svg/glyphs/ (without .svg) */
  name: string;
  /** Icon size in pixels (sets both width and height) */
  size?: number;
}

export const Icon: FC<IconProps> = ({ name, size = 24, ...rest }) => {
  const [SvgComponent, setSvgComponent] = useState<FC<SVGProps<SVGSVGElement>> | null>(
    () => cache.get(name) ?? null
  );

  useEffect(() => {
    if (cache.has(name)) {
      setSvgComponent(() => cache.get(name)!);
      return;
    }

    const modulePath = findModulePath(name);
    if (!modulePath) return;

    let cancelled = false;
    svgModules[modulePath]().then((mod) => {
      if (cancelled) return;
      cache.set(name, mod.default);
      setSvgComponent(() => mod.default);
    });

    return () => { cancelled = true; };
  }, [name]);

  if (!SvgComponent) return null;

  return <SvgComponent width={size} height={size} {...rest} />;
};
