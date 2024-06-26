export declare interface AccessAttributeNode extends BaseNode {
  type: 'AccessAttribute'
  base?: ExprNode
  name: string
}

export declare interface AccessElementNode extends BaseNode {
  type: 'AccessElement'
  base: ExprNode
  index: number
}

export declare interface AndNode extends BaseNode {
  type: 'And'
  left: ExprNode
  right: ExprNode
}

export declare type AnyStaticValue =
  | StringValue
  | NumberValue
  | NullValue
  | BooleanValue
  | DateTimeValue
  | ObjectValue
  | ArrayValue
  | PathValue

export declare interface ArrayCoerceNode extends BaseNode {
  type: 'ArrayCoerce'
  base: ExprNode
}

export declare interface ArrayElementNode extends BaseNode {
  type: 'ArrayElement'
  value: ExprNode
  isSplat: boolean
}

export declare interface ArrayNode extends BaseNode {
  type: 'Array'
  elements: ArrayElementNode[]
}

/** Describes a type node for array values. */
export declare interface ArrayTypeNode<T extends TypeNode = TypeNode> {
  /** can be used to identify the type of the node, in this case it's always 'array' */
  type: 'array'
  /** the type of the array elements */
  of: T
}

export declare type ArrayValue = StaticValue<unknown[], 'array'>

export declare interface AscNode extends BaseNode {
  type: 'Asc'
  base: ExprNode
}

/** The base interface for SyntaxNode. */
export declare interface BaseNode {
  type: string
}

/** Describes a type node for boolean values, optionally including a value. If a value is provided it will always be the given boolean value. */
export declare interface BooleanTypeNode {
  /** can be used to identify the type of the node, in this case it's always 'boolean' */
  type: 'boolean'
  /** an optional value of the boolean, if provided it will always be the given boolean value */
  value?: boolean
}

export declare type BooleanValue = StaticValue<boolean, 'boolean'>

export declare interface Context {
  timestamp: Date
  identity: string
  before: Value | null
  after: Value | null
  sanity?: {
    projectId: string
    dataset: string
  }
  dereference?: DereferenceFunction
}

export declare interface ContextNode extends BaseNode {
  type: 'Context'
  key: string
}

/**
 * createReferenceTypeNode creates a ObjectTypeNode representing a reference type
 * it adds required attributes for a reference type.
 * @param name - The name of the reference type
 * @param inArray - Whether the reference is in an array
 * @returns A ObjectTypeNode representing a reference type
 * @internal
 */
export declare function createReferenceTypeNode(name: string, inArray?: boolean): ObjectTypeNode

export declare class DateTime {
  date: Date
  constructor(date: Date)
  static parseToValue(str: string): Value
  equals(other: DateTime): boolean
  add(secs: number): DateTime
  difference(other: DateTime): number
  compareTo(other: DateTime): number
  toString(): string
  toJSON(): string
}

export declare type DateTimeValue = StaticValue<DateTime, 'datetime'>

export declare type DereferenceFunction = (obj: {
  _ref: string
}) => PromiseLike<Document_2 | null | undefined>

export declare interface DerefNode extends BaseNode {
  type: 'Deref'
  base: ExprNode
}

export declare interface DescNode extends BaseNode {
  type: 'Desc'
  base: ExprNode
}

declare type Document_2 = {
  _id?: string
  _type?: string
  [T: string]: unknown
}
export {Document_2 as Document}

/** Represents a document structure with a fixed type 'document', a name, and a collection of attributes.*/
export declare interface DocumentSchemaType {
  /** can be used to identify the type of the node, in this case it's always 'document' */
  type: 'document'
  /** the name of the document */
  name: string
  /** ttributes is defined by a key-value pair where the key is a string and the value is an ObjectAttribute. */
  attributes: Record<string, ObjectAttribute>
}

/**
 * Evaluates a query.
 */
export declare function evaluate(
  tree: ExprNode,
  options?: EvaluateOptions,
): Value | PromiseLike<Value>

export declare interface EvaluateOptions {
  root?: any
  dataset?: any
  params?: Record<string, unknown>
  timestamp?: Date
  identity?: string
  before?: any
  after?: any
  sanity?: {
    projectId: string
    dataset: string
  }
  dereference?: DereferenceFunction
}

export declare interface EverythingNode extends BaseNode {
  type: 'Everything'
}

export declare type Executor<N = ExprNode> = (node: N, scope: Scope) => Value | PromiseLike<Value>

/** A node which can be evaluated into a value. */
export declare type ExprNode =
  | AccessAttributeNode
  | AccessElementNode
  | AndNode
  | ArrayNode
  | ArrayCoerceNode
  | AscNode
  | ContextNode
  | DerefNode
  | DescNode
  | EverythingNode
  | FilterNode
  | FlatMapNode
  | FuncCallNode
  | GroupNode
  | InRangeNode
  | MapNode
  | NegNode
  | NotNode
  | ObjectNode
  | OpCallNode
  | OrNode
  | ParameterNode
  | ParentNode_2
  | PipeFuncCallNode
  | PosNode
  | ProjectionNode
  | SelectNode
  | SelectorNode
  | SliceNode
  | ThisNode
  | TupleNode
  | ValueNode

export declare interface FilterNode extends BaseNode {
  type: 'Filter'
  base: ExprNode
  expr: ExprNode
}

export declare interface FlatMapNode extends BaseNode {
  type: 'FlatMap'
  base: ExprNode
  expr: ExprNode
}

export declare interface FuncCallNode extends BaseNode {
  type: 'FuncCall'
  func: GroqFunction
  namespace: string
  name: string
  args: ExprNode[]
}

export declare type GroqFunction = (
  args: GroqFunctionArg[],
  scope: Scope,
  execute: Executor,
) => PromiseLike<Value>

export declare type GroqFunctionArg = ExprNode

export declare type GroqPipeFunction = (
  base: Value,
  args: ExprNode[],
  scope: Scope,
  execute: Executor,
) => PromiseLike<Value>

/**
 * A type of a value in GROQ.
 */
export declare type GroqType =
  | 'null'
  | 'boolean'
  | 'number'
  | 'string'
  | 'array'
  | 'object'
  | 'path'
  | 'datetime'

export declare interface GroupNode extends BaseNode {
  type: 'Group'
  base: ExprNode
}

/** Describes a type node for inline values, including a name that references another type. */
export declare interface InlineTypeNode {
  /** can be used to identify the type of the node, in this case it's always 'inline' */
  type: 'inline'
  /** the name of the referenced type */
  name: string
}

export declare interface InRangeNode extends BaseNode {
  type: 'InRange'
  base: ExprNode
  left: ExprNode
  right: ExprNode
  isInclusive: boolean
}

export declare interface MapNode extends BaseNode {
  type: 'Map'
  base: ExprNode
  expr: ExprNode
}

export declare interface NegNode extends BaseNode {
  type: 'Neg'
  base: ExprNode
}

export declare interface NotNode extends BaseNode {
  type: 'Not'
  base: ExprNode
}

/** Describes a type node for null values, always being the null value. */
export declare interface NullTypeNode {
  /** can be used to identify the type of the node, in this case it's always 'null' */
  type: 'null'
}

export declare type NullValue = StaticValue<null, 'null'>

/** Describes a type node for number values, optionally including a value. If a value is provided it will always be the given numeric value.*/
export declare interface NumberTypeNode {
  /** can be used to identify the type of the node, in this case it's always 'number' */
  type: 'number'
  /** an optional value of the number, if provided it will always be the given numeric value */
  value?: number
}

export declare type NumberValue = StaticValue<number, 'number'>

/** Describes a type node for object attributes, including a type and an optional flag for being optional. */
export declare interface ObjectAttribute<T extends TypeNode = TypeNode> {
  /** can be used to identify the type of the node, in this case it's always 'objectAttribute' */
  type: 'objectAttribute'
  /** the type of the attribute */
  value: T
  /** an optional flag if the attribute is optional set on the object */
  optional?: boolean
}

export declare type ObjectAttributeNode =
  | ObjectAttributeValueNode
  | ObjectConditionalSplatNode
  | ObjectSplatNode

export declare interface ObjectAttributeValueNode extends BaseNode {
  type: 'ObjectAttributeValue'
  name: string
  value: ExprNode
}

export declare interface ObjectConditionalSplatNode extends BaseNode {
  type: 'ObjectConditionalSplat'
  condition: ExprNode
  value: ExprNode
}

export declare interface ObjectNode extends BaseNode {
  type: 'Object'
  attributes: ObjectAttributeNode[]
}

export declare interface ObjectSplatNode extends BaseNode {
  type: 'ObjectSplat'
  value: ExprNode
}

/**
 * Describes a type node for object values, including a collection of attributes and an optional rest value.
 * The rest value can be another ObjectTypeNode, an UnknownTypeNode, or an InlineTypeNode.
 * If the rest value is an ObjectTypeNode, it means that the object can have additional attributes.
 * If the rest value is an UnknownTypeNode, the entire object is unknown.
 * If the rest value is an InlineTypeNode, it means that the object has additional attributes from the referenced type.
 */
export declare interface ObjectTypeNode<T extends TypeNode = TypeNode> {
  /** can be used to identify the type of the node, in this case it's always 'object' */
  type: 'object'
  /** a collection of attributes */
  attributes: Record<string, ObjectAttribute<T>>
  /** an optional rest value */
  rest?: ObjectTypeNode | UnknownTypeNode | InlineTypeNode
  dereferencesTo?: string
}

export declare type ObjectValue = StaticValue<Record<string, unknown>, 'object'>

export declare type OpCall =
  | '=='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='
  | '+'
  | '-'
  | '*'
  | '/'
  | '%'
  | '**'
  | 'in'
  | 'match'

export declare interface OpCallNode extends BaseNode {
  type: 'OpCall'
  op: OpCall
  left: ExprNode
  right: ExprNode
}

export declare interface OrNode extends BaseNode {
  type: 'Or'
  left: ExprNode
  right: ExprNode
}

export declare interface ParameterNode extends BaseNode {
  type: 'Parameter'
  name: string
}

declare interface ParentNode_2 extends BaseNode {
  type: 'Parent'
  n: number
}
export {ParentNode_2 as ParentNode}

/**
 * Parses a GROQ query and returns a tree structure.
 */
export declare function parse(input: string, options?: ParseOptions): ExprNode

export declare interface ParseOptions {
  params?: Record<string, unknown>
  mode?: 'normal' | 'delta'
}

export declare class Path {
  private pattern
  private patternRe
  constructor(pattern: string)
  matches(str: string): boolean
  toJSON(): string
}

export declare type PathValue = StaticValue<Path, 'path'>

export declare interface PipeFuncCallNode extends BaseNode {
  type: 'PipeFuncCall'
  func: GroqPipeFunction
  base: ExprNode
  name: string
  args: ExprNode[]
}

export declare interface PosNode extends BaseNode {
  type: 'Pos'
  base: ExprNode
}

/** Union of any primitive type nodes. */
export declare type PrimitiveTypeNode = StringTypeNode | NumberTypeNode | BooleanTypeNode

export declare interface ProjectionNode extends BaseNode {
  type: 'Projection'
  base: ExprNode
  expr: ExprNode
}

/** A schema consisting of a list of Document or TypeDeclaration items, allowing for complex type definitions. */
export declare type SchemaType = (DocumentSchemaType | TypeDeclarationSchemaType)[]

export declare class Scope {
  params: Record<string, unknown>
  source: Value
  value: Value
  parent: Scope | null
  context: Context
  isHidden: boolean
  constructor(
    params: Record<string, unknown>,
    source: Value,
    value: Value,
    context: Context,
    parent: Scope | null,
  )
  createNested(value: Value): Scope
  createHidden(value: Value): Scope
}

export declare interface SelectAlternativeNode extends BaseNode {
  type: 'SelectAlternative'
  condition: ExprNode
  value: ExprNode
}

export declare interface SelectNode extends BaseNode {
  type: 'Select'
  alternatives: SelectAlternativeNode[]
  fallback?: ExprNode
}

export declare interface SelectorNode extends BaseNode {
  type: 'Selector'
}

export declare interface SliceNode extends BaseNode {
  type: 'Slice'
  base: ExprNode
  left: number
  right: number
  isInclusive: boolean
}

export declare class StaticValue<P, T extends GroqType> {
  data: P
  type: T
  constructor(data: P, type: T)
  isArray(): boolean
  get(): Promise<any>
  [Symbol.asyncIterator](): Generator<Value, void, unknown>
}

export declare class StreamValue {
  type: 'stream'
  private generator
  private ticker
  private isDone
  private data
  constructor(generator: () => AsyncGenerator<Value, void, unknown>)
  isArray(): boolean
  get(): Promise<any>
  [Symbol.asyncIterator](): AsyncGenerator<Value, void, unknown>
  _nextTick(): Promise<void>
}

/** Describes a type node for string values, optionally including a value. If a value is provided it will always be the given string value. */
export declare interface StringTypeNode {
  /** can be used to identify the type of the node, in this case it's always 'string' */
  type: 'string'
  /** an optional value of the string, if provided it will always be the given string value */
  value?: string
}

export declare type StringValue = StaticValue<string, 'string'>

/** Any sort of node which appears as syntax */
export declare type SyntaxNode =
  | ExprNode
  | ArrayElementNode
  | ObjectAttributeNode
  | SelectAlternativeNode

export declare interface ThisNode extends BaseNode {
  type: 'This'
}

export declare interface TupleNode extends BaseNode {
  type: 'Tuple'
  members: Array<ExprNode>
}

/** Defines a type declaration with a specific name and a value that describes the structure of the type using a TypeNode. */
export declare interface TypeDeclarationSchemaType {
  /** can be used to identify the type of the node, in this case it's always 'type' */
  type: 'type'
  /** the name of the type */
  name: string
  /** the value that describes the structure of the type */
  value: TypeNode
}

/**
 * Evaluates the type of a query and schema.
 *
 * @param ast - The query ast to evaluate.
 * @param schema - The schemas to use for type evaluation.
 * @returns The type of the query.
 * @beta
 */
export declare function typeEvaluate(ast: ExprNode, schema: SchemaType): TypeNode

/** All possible type nodes. */
export declare type TypeNode =
  | ObjectTypeNode
  | StringTypeNode
  | NullTypeNode
  | NumberTypeNode
  | BooleanTypeNode
  | ArrayTypeNode
  | UnionTypeNode
  | InlineTypeNode
  | UnknownTypeNode

/** Describes a type node for union values. */
export declare interface UnionTypeNode<T extends TypeNode = TypeNode> {
  /** can be used to identify the type of the node, in this case it's always 'union' */
  type: 'union'
  /** a collection of types */
  of: T[]
}

/** Describes a type node for unknown value. */
export declare type UnknownTypeNode = {
  /** can be used to identify the type of the node, in this case it's always 'unknown' */
  type: 'unknown'
}

/**
 * The result of an expression.
 */
export declare type Value = AnyStaticValue | StreamValue

export declare interface ValueNode<P = any> {
  type: 'Value'
  value: P
}

export {}
