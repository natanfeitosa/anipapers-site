// https://github.com/paulcollett/react-masonry-css/blob/master/src/react-masonry-css.js

import React from 'react';

export interface MasonryBreakpointCols { default: number, [key: number]: number }

export const defaultBreakpointCols = {
  default: 6,
  1280: 5,
  1024: 4,
  768: 3,
  640: 2,
};

export interface MasonryProps {
  breakpointCols?: number | MasonryBreakpointCols
  className?: string
  columnClassName?: string

  // Any React children. Typically an array of JSX items
  children?: React.ReactNode

  // Custom attributes, however it is advised against
  // using these to prevent unintended issues and future conflicts
  // ...any other attribute, will be added to the container
  columnAttrs?: JSX.IntrinsicElements['div']
};

const DEFAULT_COLUMNS = 2;

class Masonry extends React.Component<MasonryProps, { columnCount: number }> {
  _lastRecalculateAnimationFrame?: number

  static defaultProps?: MasonryProps

  constructor(props: MasonryProps | Readonly<MasonryProps>) {
    super(props);

    // Correct scope for when methods are accessed externally
    this.reCalculateColumnCount = this.reCalculateColumnCount.bind(this);
    this.reCalculateColumnCountDebounce = this.reCalculateColumnCountDebounce.bind(this);

    this.state = { columnCount: DEFAULT_COLUMNS }
  }

  componentDidMount() {
    this.reCalculateColumnCount();

    // window may not be available in some environments
    if (window) {
      window.addEventListener('resize', this.reCalculateColumnCountDebounce);
    }
  }

  componentDidUpdate() {
    this.reCalculateColumnCount();
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.reCalculateColumnCountDebounce);
    }
  }

  reCalculateColumnCountDebounce() {
    if (!window || !window.requestAnimationFrame) {  // IE10+
      this.reCalculateColumnCount();
      return;
    }

    if (window.cancelAnimationFrame && this._lastRecalculateAnimationFrame) { // IE10+
      window.cancelAnimationFrame(this._lastRecalculateAnimationFrame);
    }

    this._lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
      this.reCalculateColumnCount();
    });
  }

  reCalculateColumnCount() {
    if (!this.props.breakpointCols) {
      throw new Error("breakpointCols not found")
    }
  
    const windowWidth = window && window.innerWidth || Infinity;
    const breakpointCols = typeof this.props.breakpointCols === 'object' ? this.props.breakpointCols : { default: this.props.breakpointCols || DEFAULT_COLUMNS };
  
    let columns = breakpointCols.default;
  
    // Iterate through breakpoints and find the one that matches the window width
    for (const breakpoint in breakpointCols) {
      if (breakpoint !== 'default' && windowWidth <= parseInt(breakpoint)) {
        columns = breakpointCols[breakpoint];
        break;
      }
    }
  
    columns = Math.max(1, columns || 1);
  
    if (this.state.columnCount !== columns) {
      this.setState({ columnCount: columns });
    }
  }  

  itemsInColumns() {
    const currentColumnCount = this.state.columnCount;
    const itemsInColumns = new Array(currentColumnCount);

    // Force children to be handled as an array
    const items = React.Children.toArray(this.props.children)

    for (let i = 0; i < items.length; i++) {
      const columnIndex = i % currentColumnCount;

      if (!itemsInColumns[columnIndex]) {
        itemsInColumns[columnIndex] = [];
      }

      itemsInColumns[columnIndex].push(items[i]);
    }

    return itemsInColumns;
  }

  renderColumns() {
    const { columnAttrs = {}, columnClassName } = this.props;
    const childrenInColumns = this.itemsInColumns();
    const columnWidth = `${100 / childrenInColumns.length}%`;
    let className = columnClassName;

    if (className && typeof className !== 'string') {
      this.logDeprecated('The property "columnClassName" requires a string');

      // This is a deprecated default and will be removed soon.
      if (typeof className === 'undefined') {
        className = 'my-masonry-grid_column';
      }
    }

    const columnAttributes = {
      // NOTE: the column property is undocumented and considered deprecated.
      // It is an alias of the `columnAttrs` property
      ...columnAttrs,
      style: {
        ...columnAttrs.style,
        width: columnWidth
      },
      className
    };

    return childrenInColumns.map((items, i) => {
      return <div
        {...columnAttributes}

        key={i}
      >
        {items}
      </div>;
    });
  }

  logDeprecated(message: string) {
    console.error('[Masonry]', message);
  }

  render() {
    const {
      // ignored
      children,
      breakpointCols,
      columnClassName,
      columnAttrs,

      // used
      className,

      ...rest
    } = this.props;

    let classNameOutput = className;

    if (typeof className !== 'string') {
      this.logDeprecated('The property "className" requires a string');

      // This is a deprecated default and will be removed soon.
      if (typeof className === 'undefined') {
        classNameOutput = 'my-masonry-grid';
      }
    }

    return (
      <div
        {...rest}
        className={classNameOutput}
      >
        {this.renderColumns()}
      </div>
    );
  }
}

Masonry.defaultProps = {
  breakpointCols: defaultBreakpointCols
}

export default Masonry;