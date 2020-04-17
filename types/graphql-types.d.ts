export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date string, such as 2007-12-03, compliant with the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};











export type BooleanQueryOperatorInput = {
  eq?: Maybe<Scalars['Boolean']>;
  ne?: Maybe<Scalars['Boolean']>;
  in?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Boolean']>>>;
};

export type ContentfulAsset = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  contentful_id?: Maybe<Scalars['String']>;
  file?: Maybe<ContentfulAssetFile>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  node_locale?: Maybe<Scalars['String']>;
  fixed?: Maybe<ContentfulFixed>;
  /** @deprecated Resolutions was deprecated in Gatsby v2. It's been renamed to "fixed" https://example.com/write-docs-and-fix-this-example-link */
  resolutions?: Maybe<ContentfulResolutions>;
  fluid?: Maybe<ContentfulFluid>;
  /** @deprecated Sizes was deprecated in Gatsby v2. It's been renamed to "fluid" https://example.com/write-docs-and-fix-this-example-link */
  sizes?: Maybe<ContentfulSizes>;
  resize?: Maybe<ContentfulResize>;
};


export type ContentfulAssetFixedArgs = {
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ContentfulImageFormat>;
  resizingBehavior?: Maybe<ImageResizingBehavior>;
  cropFocus?: Maybe<ContentfulImageCropFocus>;
  background?: Maybe<Scalars['String']>;
};


export type ContentfulAssetResolutionsArgs = {
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ContentfulImageFormat>;
  resizingBehavior?: Maybe<ImageResizingBehavior>;
  cropFocus?: Maybe<ContentfulImageCropFocus>;
  background?: Maybe<Scalars['String']>;
};


export type ContentfulAssetFluidArgs = {
  maxWidth?: Maybe<Scalars['Int']>;
  maxHeight?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ContentfulImageFormat>;
  resizingBehavior?: Maybe<ImageResizingBehavior>;
  cropFocus?: Maybe<ContentfulImageCropFocus>;
  background?: Maybe<Scalars['String']>;
  sizes?: Maybe<Scalars['String']>;
};


export type ContentfulAssetSizesArgs = {
  maxWidth?: Maybe<Scalars['Int']>;
  maxHeight?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ContentfulImageFormat>;
  resizingBehavior?: Maybe<ImageResizingBehavior>;
  cropFocus?: Maybe<ContentfulImageCropFocus>;
  background?: Maybe<Scalars['String']>;
  sizes?: Maybe<Scalars['String']>;
};


export type ContentfulAssetResizeArgs = {
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  resizingBehavior?: Maybe<ImageResizingBehavior>;
  toFormat?: Maybe<ContentfulImageFormat>;
  cropFocus?: Maybe<ContentfulImageCropFocus>;
  background?: Maybe<Scalars['String']>;
};

export type ContentfulAssetConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulAssetEdge>;
  nodes: Array<ContentfulAsset>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulAssetGroupConnection>;
};


export type ContentfulAssetConnectionDistinctArgs = {
  field: ContentfulAssetFieldsEnum;
};


export type ContentfulAssetConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulAssetFieldsEnum;
};

export type ContentfulAssetEdge = {
  next?: Maybe<ContentfulAsset>;
  node: ContentfulAsset;
  previous?: Maybe<ContentfulAsset>;
};

export type ContentfulAssetFieldsEnum = 
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type' |
  'contentful_id' |
  'file___url' |
  'file___details___size' |
  'file___details___image___width' |
  'file___details___image___height' |
  'file___fileName' |
  'file___contentType' |
  'title' |
  'description' |
  'node_locale' |
  'fixed___base64' |
  'fixed___tracedSVG' |
  'fixed___aspectRatio' |
  'fixed___width' |
  'fixed___height' |
  'fixed___src' |
  'fixed___srcSet' |
  'fixed___srcWebp' |
  'fixed___srcSetWebp' |
  'resolutions___base64' |
  'resolutions___tracedSVG' |
  'resolutions___aspectRatio' |
  'resolutions___width' |
  'resolutions___height' |
  'resolutions___src' |
  'resolutions___srcSet' |
  'resolutions___srcWebp' |
  'resolutions___srcSetWebp' |
  'fluid___base64' |
  'fluid___tracedSVG' |
  'fluid___aspectRatio' |
  'fluid___src' |
  'fluid___srcSet' |
  'fluid___srcWebp' |
  'fluid___srcSetWebp' |
  'fluid___sizes' |
  'sizes___base64' |
  'sizes___tracedSVG' |
  'sizes___aspectRatio' |
  'sizes___src' |
  'sizes___srcSet' |
  'sizes___srcWebp' |
  'sizes___srcSetWebp' |
  'sizes___sizes' |
  'resize___base64' |
  'resize___tracedSVG' |
  'resize___src' |
  'resize___width' |
  'resize___height' |
  'resize___aspectRatio';

export type ContentfulAssetFile = {
  url?: Maybe<Scalars['String']>;
  details?: Maybe<ContentfulAssetFileDetails>;
  fileName?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
};

export type ContentfulAssetFileDetails = {
  size?: Maybe<Scalars['Int']>;
  image?: Maybe<ContentfulAssetFileDetailsImage>;
};

export type ContentfulAssetFileDetailsFilterInput = {
  size?: Maybe<IntQueryOperatorInput>;
  image?: Maybe<ContentfulAssetFileDetailsImageFilterInput>;
};

export type ContentfulAssetFileDetailsImage = {
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
};

export type ContentfulAssetFileDetailsImageFilterInput = {
  width?: Maybe<IntQueryOperatorInput>;
  height?: Maybe<IntQueryOperatorInput>;
};

export type ContentfulAssetFileFilterInput = {
  url?: Maybe<StringQueryOperatorInput>;
  details?: Maybe<ContentfulAssetFileDetailsFilterInput>;
  fileName?: Maybe<StringQueryOperatorInput>;
  contentType?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulAssetFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  contentful_id?: Maybe<StringQueryOperatorInput>;
  file?: Maybe<ContentfulAssetFileFilterInput>;
  title?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  fixed?: Maybe<ContentfulFixedFilterInput>;
  resolutions?: Maybe<ContentfulResolutionsFilterInput>;
  fluid?: Maybe<ContentfulFluidFilterInput>;
  sizes?: Maybe<ContentfulSizesFilterInput>;
  resize?: Maybe<ContentfulResizeFilterInput>;
};

export type ContentfulAssetGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulAssetEdge>;
  nodes: Array<ContentfulAsset>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulAssetSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulAssetFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulContentType = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  displayField?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ContentfulContentTypeConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulContentTypeEdge>;
  nodes: Array<ContentfulContentType>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulContentTypeGroupConnection>;
};


export type ContentfulContentTypeConnectionDistinctArgs = {
  field: ContentfulContentTypeFieldsEnum;
};


export type ContentfulContentTypeConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulContentTypeFieldsEnum;
};

export type ContentfulContentTypeEdge = {
  next?: Maybe<ContentfulContentType>;
  node: ContentfulContentType;
  previous?: Maybe<ContentfulContentType>;
};

export type ContentfulContentTypeFieldsEnum = 
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type' |
  'name' |
  'displayField' |
  'description';

export type ContentfulContentTypeFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  name?: Maybe<StringQueryOperatorInput>;
  displayField?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulContentTypeGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulContentTypeEdge>;
  nodes: Array<ContentfulContentType>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulContentTypeSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulContentTypeFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulCourse = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  courseId?: Maybe<Scalars['String']>;
  ects?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<ContentfulCourseDescriptionRichTextNode>;
  spaceId?: Maybe<Scalars['String']>;
  contentful_id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulCourseSys>;
  node_locale?: Maybe<Scalars['String']>;
  teacher?: Maybe<Array<Maybe<ContentfulTeacher>>>;
  major?: Maybe<Array<Maybe<ContentfulMajor>>>;
  childContentfulCourseDescriptionRichTextNode?: Maybe<ContentfulCourseDescriptionRichTextNode>;
};


export type ContentfulCourseCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulCourseUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulCourseConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulCourseEdge>;
  nodes: Array<ContentfulCourse>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulCourseGroupConnection>;
};


export type ContentfulCourseConnectionDistinctArgs = {
  field: ContentfulCourseFieldsEnum;
};


export type ContentfulCourseConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulCourseFieldsEnum;
};

export type ContentfulCourseDescriptionRichTextNode = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  /** @deprecated This field is deprecated, please use 'json' instead. */
  nodeType?: Maybe<Scalars['String']>;
  content?: Maybe<Array<Maybe<ContentfulCourseDescriptionRichTextNodeContent>>>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<ContentfulCourseDescriptionRichTextNodeFields>;
  json?: Maybe<Scalars['JSON']>;
};

export type ContentfulCourseDescriptionRichTextNodeConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulCourseDescriptionRichTextNodeEdge>;
  nodes: Array<ContentfulCourseDescriptionRichTextNode>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulCourseDescriptionRichTextNodeGroupConnection>;
};


export type ContentfulCourseDescriptionRichTextNodeConnectionDistinctArgs = {
  field: ContentfulCourseDescriptionRichTextNodeFieldsEnum;
};


export type ContentfulCourseDescriptionRichTextNodeConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulCourseDescriptionRichTextNodeFieldsEnum;
};

export type ContentfulCourseDescriptionRichTextNodeContent = {
  nodeType?: Maybe<Scalars['String']>;
  content?: Maybe<Array<Maybe<ContentfulCourseDescriptionRichTextNodeContentContent>>>;
};

export type ContentfulCourseDescriptionRichTextNodeContentContent = {
  nodeType?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ContentfulCourseDescriptionRichTextNodeContentContentFilterInput = {
  nodeType?: Maybe<StringQueryOperatorInput>;
  value?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulCourseDescriptionRichTextNodeContentContentFilterListInput = {
  elemMatch?: Maybe<ContentfulCourseDescriptionRichTextNodeContentContentFilterInput>;
};

export type ContentfulCourseDescriptionRichTextNodeContentFilterInput = {
  nodeType?: Maybe<StringQueryOperatorInput>;
  content?: Maybe<ContentfulCourseDescriptionRichTextNodeContentContentFilterListInput>;
};

export type ContentfulCourseDescriptionRichTextNodeContentFilterListInput = {
  elemMatch?: Maybe<ContentfulCourseDescriptionRichTextNodeContentFilterInput>;
};

export type ContentfulCourseDescriptionRichTextNodeEdge = {
  next?: Maybe<ContentfulCourseDescriptionRichTextNode>;
  node: ContentfulCourseDescriptionRichTextNode;
  previous?: Maybe<ContentfulCourseDescriptionRichTextNode>;
};

export type ContentfulCourseDescriptionRichTextNodeFields = {
  excerpt?: Maybe<Scalars['String']>;
};

export type ContentfulCourseDescriptionRichTextNodeFieldsEnum = 
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type' |
  'nodeType' |
  'content' |
  'content___nodeType' |
  'content___content' |
  'content___content___nodeType' |
  'content___content___value' |
  'description' |
  'fields___excerpt' |
  'json';

export type ContentfulCourseDescriptionRichTextNodeFieldsFilterInput = {
  excerpt?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulCourseDescriptionRichTextNodeFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  nodeType?: Maybe<StringQueryOperatorInput>;
  content?: Maybe<ContentfulCourseDescriptionRichTextNodeContentFilterListInput>;
  description?: Maybe<StringQueryOperatorInput>;
  fields?: Maybe<ContentfulCourseDescriptionRichTextNodeFieldsFilterInput>;
  json?: Maybe<JsonQueryOperatorInput>;
};

export type ContentfulCourseDescriptionRichTextNodeGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulCourseDescriptionRichTextNodeEdge>;
  nodes: Array<ContentfulCourseDescriptionRichTextNode>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulCourseDescriptionRichTextNodeSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulCourseDescriptionRichTextNodeFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulCourseEdge = {
  next?: Maybe<ContentfulCourse>;
  node: ContentfulCourse;
  previous?: Maybe<ContentfulCourse>;
};

export type ContentfulCourseFieldsEnum = 
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type' |
  'courseId' |
  'ects' |
  'name' |
  'description___id' |
  'description___parent___id' |
  'description___parent___parent___id' |
  'description___parent___parent___children' |
  'description___parent___children' |
  'description___parent___children___id' |
  'description___parent___children___children' |
  'description___parent___internal___content' |
  'description___parent___internal___contentDigest' |
  'description___parent___internal___description' |
  'description___parent___internal___fieldOwners' |
  'description___parent___internal___ignoreType' |
  'description___parent___internal___mediaType' |
  'description___parent___internal___owner' |
  'description___parent___internal___type' |
  'description___children' |
  'description___children___id' |
  'description___children___parent___id' |
  'description___children___parent___children' |
  'description___children___children' |
  'description___children___children___id' |
  'description___children___children___children' |
  'description___children___internal___content' |
  'description___children___internal___contentDigest' |
  'description___children___internal___description' |
  'description___children___internal___fieldOwners' |
  'description___children___internal___ignoreType' |
  'description___children___internal___mediaType' |
  'description___children___internal___owner' |
  'description___children___internal___type' |
  'description___internal___content' |
  'description___internal___contentDigest' |
  'description___internal___description' |
  'description___internal___fieldOwners' |
  'description___internal___ignoreType' |
  'description___internal___mediaType' |
  'description___internal___owner' |
  'description___internal___type' |
  'description___nodeType' |
  'description___content' |
  'description___content___nodeType' |
  'description___content___content' |
  'description___content___content___nodeType' |
  'description___content___content___value' |
  'description___description' |
  'description___fields___excerpt' |
  'description___json' |
  'spaceId' |
  'contentful_id' |
  'createdAt' |
  'updatedAt' |
  'sys___revision' |
  'sys___contentType___sys___type' |
  'sys___contentType___sys___linkType' |
  'sys___contentType___sys___id' |
  'sys___contentType___sys___contentful_id' |
  'node_locale' |
  'teacher' |
  'teacher___id' |
  'teacher___parent___id' |
  'teacher___parent___parent___id' |
  'teacher___parent___parent___children' |
  'teacher___parent___children' |
  'teacher___parent___children___id' |
  'teacher___parent___children___children' |
  'teacher___parent___internal___content' |
  'teacher___parent___internal___contentDigest' |
  'teacher___parent___internal___description' |
  'teacher___parent___internal___fieldOwners' |
  'teacher___parent___internal___ignoreType' |
  'teacher___parent___internal___mediaType' |
  'teacher___parent___internal___owner' |
  'teacher___parent___internal___type' |
  'teacher___children' |
  'teacher___children___id' |
  'teacher___children___parent___id' |
  'teacher___children___parent___children' |
  'teacher___children___children' |
  'teacher___children___children___id' |
  'teacher___children___children___children' |
  'teacher___children___internal___content' |
  'teacher___children___internal___contentDigest' |
  'teacher___children___internal___description' |
  'teacher___children___internal___fieldOwners' |
  'teacher___children___internal___ignoreType' |
  'teacher___children___internal___mediaType' |
  'teacher___children___internal___owner' |
  'teacher___children___internal___type' |
  'teacher___internal___content' |
  'teacher___internal___contentDigest' |
  'teacher___internal___description' |
  'teacher___internal___fieldOwners' |
  'teacher___internal___ignoreType' |
  'teacher___internal___mediaType' |
  'teacher___internal___owner' |
  'teacher___internal___type' |
  'teacher___name' |
  'teacher___slug' |
  'teacher___avatar___id' |
  'teacher___avatar___parent___id' |
  'teacher___avatar___parent___children' |
  'teacher___avatar___children' |
  'teacher___avatar___children___id' |
  'teacher___avatar___children___children' |
  'teacher___avatar___internal___content' |
  'teacher___avatar___internal___contentDigest' |
  'teacher___avatar___internal___description' |
  'teacher___avatar___internal___fieldOwners' |
  'teacher___avatar___internal___ignoreType' |
  'teacher___avatar___internal___mediaType' |
  'teacher___avatar___internal___owner' |
  'teacher___avatar___internal___type' |
  'teacher___avatar___contentful_id' |
  'teacher___avatar___file___url' |
  'teacher___avatar___file___fileName' |
  'teacher___avatar___file___contentType' |
  'teacher___avatar___title' |
  'teacher___avatar___description' |
  'teacher___avatar___node_locale' |
  'teacher___avatar___fixed___base64' |
  'teacher___avatar___fixed___tracedSVG' |
  'teacher___avatar___fixed___aspectRatio' |
  'teacher___avatar___fixed___width' |
  'teacher___avatar___fixed___height' |
  'teacher___avatar___fixed___src' |
  'teacher___avatar___fixed___srcSet' |
  'teacher___avatar___fixed___srcWebp' |
  'teacher___avatar___fixed___srcSetWebp' |
  'teacher___avatar___resolutions___base64' |
  'teacher___avatar___resolutions___tracedSVG' |
  'teacher___avatar___resolutions___aspectRatio' |
  'teacher___avatar___resolutions___width' |
  'teacher___avatar___resolutions___height' |
  'teacher___avatar___resolutions___src' |
  'teacher___avatar___resolutions___srcSet' |
  'teacher___avatar___resolutions___srcWebp' |
  'teacher___avatar___resolutions___srcSetWebp' |
  'teacher___avatar___fluid___base64' |
  'teacher___avatar___fluid___tracedSVG' |
  'teacher___avatar___fluid___aspectRatio' |
  'teacher___avatar___fluid___src' |
  'teacher___avatar___fluid___srcSet' |
  'teacher___avatar___fluid___srcWebp' |
  'teacher___avatar___fluid___srcSetWebp' |
  'teacher___avatar___fluid___sizes' |
  'teacher___avatar___sizes___base64' |
  'teacher___avatar___sizes___tracedSVG' |
  'teacher___avatar___sizes___aspectRatio' |
  'teacher___avatar___sizes___src' |
  'teacher___avatar___sizes___srcSet' |
  'teacher___avatar___sizes___srcWebp' |
  'teacher___avatar___sizes___srcSetWebp' |
  'teacher___avatar___sizes___sizes' |
  'teacher___avatar___resize___base64' |
  'teacher___avatar___resize___tracedSVG' |
  'teacher___avatar___resize___src' |
  'teacher___avatar___resize___width' |
  'teacher___avatar___resize___height' |
  'teacher___avatar___resize___aspectRatio' |
  'teacher___spaceId' |
  'teacher___contentful_id' |
  'teacher___createdAt' |
  'teacher___updatedAt' |
  'teacher___sys___revision' |
  'teacher___node_locale' |
  'teacher___course' |
  'teacher___course___id' |
  'teacher___course___parent___id' |
  'teacher___course___parent___children' |
  'teacher___course___children' |
  'teacher___course___children___id' |
  'teacher___course___children___children' |
  'teacher___course___internal___content' |
  'teacher___course___internal___contentDigest' |
  'teacher___course___internal___description' |
  'teacher___course___internal___fieldOwners' |
  'teacher___course___internal___ignoreType' |
  'teacher___course___internal___mediaType' |
  'teacher___course___internal___owner' |
  'teacher___course___internal___type' |
  'teacher___course___courseId' |
  'teacher___course___ects' |
  'teacher___course___name' |
  'teacher___course___description___id' |
  'teacher___course___description___children' |
  'teacher___course___description___nodeType' |
  'teacher___course___description___content' |
  'teacher___course___description___description' |
  'teacher___course___description___json' |
  'teacher___course___spaceId' |
  'teacher___course___contentful_id' |
  'teacher___course___createdAt' |
  'teacher___course___updatedAt' |
  'teacher___course___sys___revision' |
  'teacher___course___node_locale' |
  'teacher___course___teacher' |
  'teacher___course___teacher___id' |
  'teacher___course___teacher___children' |
  'teacher___course___teacher___name' |
  'teacher___course___teacher___slug' |
  'teacher___course___teacher___spaceId' |
  'teacher___course___teacher___contentful_id' |
  'teacher___course___teacher___createdAt' |
  'teacher___course___teacher___updatedAt' |
  'teacher___course___teacher___node_locale' |
  'teacher___course___teacher___course' |
  'teacher___course___major' |
  'teacher___course___major___id' |
  'teacher___course___major___children' |
  'teacher___course___major___name' |
  'teacher___course___major___slug' |
  'teacher___course___major___spaceId' |
  'teacher___course___major___contentful_id' |
  'teacher___course___major___createdAt' |
  'teacher___course___major___updatedAt' |
  'teacher___course___major___node_locale' |
  'teacher___course___major___courses' |
  'teacher___course___childContentfulCourseDescriptionRichTextNode___id' |
  'teacher___course___childContentfulCourseDescriptionRichTextNode___children' |
  'teacher___course___childContentfulCourseDescriptionRichTextNode___nodeType' |
  'teacher___course___childContentfulCourseDescriptionRichTextNode___content' |
  'teacher___course___childContentfulCourseDescriptionRichTextNode___description' |
  'teacher___course___childContentfulCourseDescriptionRichTextNode___json' |
  'major' |
  'major___id' |
  'major___parent___id' |
  'major___parent___parent___id' |
  'major___parent___parent___children' |
  'major___parent___children' |
  'major___parent___children___id' |
  'major___parent___children___children' |
  'major___parent___internal___content' |
  'major___parent___internal___contentDigest' |
  'major___parent___internal___description' |
  'major___parent___internal___fieldOwners' |
  'major___parent___internal___ignoreType' |
  'major___parent___internal___mediaType' |
  'major___parent___internal___owner' |
  'major___parent___internal___type' |
  'major___children' |
  'major___children___id' |
  'major___children___parent___id' |
  'major___children___parent___children' |
  'major___children___children' |
  'major___children___children___id' |
  'major___children___children___children' |
  'major___children___internal___content' |
  'major___children___internal___contentDigest' |
  'major___children___internal___description' |
  'major___children___internal___fieldOwners' |
  'major___children___internal___ignoreType' |
  'major___children___internal___mediaType' |
  'major___children___internal___owner' |
  'major___children___internal___type' |
  'major___internal___content' |
  'major___internal___contentDigest' |
  'major___internal___description' |
  'major___internal___fieldOwners' |
  'major___internal___ignoreType' |
  'major___internal___mediaType' |
  'major___internal___owner' |
  'major___internal___type' |
  'major___name' |
  'major___slug' |
  'major___introduction___id' |
  'major___introduction___parent___id' |
  'major___introduction___parent___children' |
  'major___introduction___children' |
  'major___introduction___children___id' |
  'major___introduction___children___children' |
  'major___introduction___internal___content' |
  'major___introduction___internal___contentDigest' |
  'major___introduction___internal___description' |
  'major___introduction___internal___fieldOwners' |
  'major___introduction___internal___ignoreType' |
  'major___introduction___internal___mediaType' |
  'major___introduction___internal___owner' |
  'major___introduction___internal___type' |
  'major___introduction___content' |
  'major___introduction___content___content' |
  'major___introduction___content___nodeType' |
  'major___introduction___nodeType' |
  'major___introduction___introduction' |
  'major___introduction___fields___excerpt' |
  'major___introduction___json' |
  'major___spaceId' |
  'major___contentful_id' |
  'major___createdAt' |
  'major___updatedAt' |
  'major___sys___revision' |
  'major___node_locale' |
  'major___courses' |
  'major___courses___id' |
  'major___courses___parent___id' |
  'major___courses___parent___children' |
  'major___courses___children' |
  'major___courses___children___id' |
  'major___courses___children___children' |
  'major___courses___internal___content' |
  'major___courses___internal___contentDigest' |
  'major___courses___internal___description' |
  'major___courses___internal___fieldOwners' |
  'major___courses___internal___ignoreType' |
  'major___courses___internal___mediaType' |
  'major___courses___internal___owner' |
  'major___courses___internal___type' |
  'major___courses___courseId' |
  'major___courses___ects' |
  'major___courses___name' |
  'major___courses___description___id' |
  'major___courses___description___children' |
  'major___courses___description___nodeType' |
  'major___courses___description___content' |
  'major___courses___description___description' |
  'major___courses___description___json' |
  'major___courses___spaceId' |
  'major___courses___contentful_id' |
  'major___courses___createdAt' |
  'major___courses___updatedAt' |
  'major___courses___sys___revision' |
  'major___courses___node_locale' |
  'major___courses___teacher' |
  'major___courses___teacher___id' |
  'major___courses___teacher___children' |
  'major___courses___teacher___name' |
  'major___courses___teacher___slug' |
  'major___courses___teacher___spaceId' |
  'major___courses___teacher___contentful_id' |
  'major___courses___teacher___createdAt' |
  'major___courses___teacher___updatedAt' |
  'major___courses___teacher___node_locale' |
  'major___courses___teacher___course' |
  'major___courses___major' |
  'major___courses___major___id' |
  'major___courses___major___children' |
  'major___courses___major___name' |
  'major___courses___major___slug' |
  'major___courses___major___spaceId' |
  'major___courses___major___contentful_id' |
  'major___courses___major___createdAt' |
  'major___courses___major___updatedAt' |
  'major___courses___major___node_locale' |
  'major___courses___major___courses' |
  'major___courses___childContentfulCourseDescriptionRichTextNode___id' |
  'major___courses___childContentfulCourseDescriptionRichTextNode___children' |
  'major___courses___childContentfulCourseDescriptionRichTextNode___nodeType' |
  'major___courses___childContentfulCourseDescriptionRichTextNode___content' |
  'major___courses___childContentfulCourseDescriptionRichTextNode___description' |
  'major___courses___childContentfulCourseDescriptionRichTextNode___json' |
  'major___childContentfulMajorIntroductionRichTextNode___id' |
  'major___childContentfulMajorIntroductionRichTextNode___parent___id' |
  'major___childContentfulMajorIntroductionRichTextNode___parent___children' |
  'major___childContentfulMajorIntroductionRichTextNode___children' |
  'major___childContentfulMajorIntroductionRichTextNode___children___id' |
  'major___childContentfulMajorIntroductionRichTextNode___children___children' |
  'major___childContentfulMajorIntroductionRichTextNode___internal___content' |
  'major___childContentfulMajorIntroductionRichTextNode___internal___contentDigest' |
  'major___childContentfulMajorIntroductionRichTextNode___internal___description' |
  'major___childContentfulMajorIntroductionRichTextNode___internal___fieldOwners' |
  'major___childContentfulMajorIntroductionRichTextNode___internal___ignoreType' |
  'major___childContentfulMajorIntroductionRichTextNode___internal___mediaType' |
  'major___childContentfulMajorIntroductionRichTextNode___internal___owner' |
  'major___childContentfulMajorIntroductionRichTextNode___internal___type' |
  'major___childContentfulMajorIntroductionRichTextNode___content' |
  'major___childContentfulMajorIntroductionRichTextNode___content___content' |
  'major___childContentfulMajorIntroductionRichTextNode___content___nodeType' |
  'major___childContentfulMajorIntroductionRichTextNode___nodeType' |
  'major___childContentfulMajorIntroductionRichTextNode___introduction' |
  'major___childContentfulMajorIntroductionRichTextNode___fields___excerpt' |
  'major___childContentfulMajorIntroductionRichTextNode___json' |
  'childContentfulCourseDescriptionRichTextNode___id' |
  'childContentfulCourseDescriptionRichTextNode___parent___id' |
  'childContentfulCourseDescriptionRichTextNode___parent___parent___id' |
  'childContentfulCourseDescriptionRichTextNode___parent___parent___children' |
  'childContentfulCourseDescriptionRichTextNode___parent___children' |
  'childContentfulCourseDescriptionRichTextNode___parent___children___id' |
  'childContentfulCourseDescriptionRichTextNode___parent___children___children' |
  'childContentfulCourseDescriptionRichTextNode___parent___internal___content' |
  'childContentfulCourseDescriptionRichTextNode___parent___internal___contentDigest' |
  'childContentfulCourseDescriptionRichTextNode___parent___internal___description' |
  'childContentfulCourseDescriptionRichTextNode___parent___internal___fieldOwners' |
  'childContentfulCourseDescriptionRichTextNode___parent___internal___ignoreType' |
  'childContentfulCourseDescriptionRichTextNode___parent___internal___mediaType' |
  'childContentfulCourseDescriptionRichTextNode___parent___internal___owner' |
  'childContentfulCourseDescriptionRichTextNode___parent___internal___type' |
  'childContentfulCourseDescriptionRichTextNode___children' |
  'childContentfulCourseDescriptionRichTextNode___children___id' |
  'childContentfulCourseDescriptionRichTextNode___children___parent___id' |
  'childContentfulCourseDescriptionRichTextNode___children___parent___children' |
  'childContentfulCourseDescriptionRichTextNode___children___children' |
  'childContentfulCourseDescriptionRichTextNode___children___children___id' |
  'childContentfulCourseDescriptionRichTextNode___children___children___children' |
  'childContentfulCourseDescriptionRichTextNode___children___internal___content' |
  'childContentfulCourseDescriptionRichTextNode___children___internal___contentDigest' |
  'childContentfulCourseDescriptionRichTextNode___children___internal___description' |
  'childContentfulCourseDescriptionRichTextNode___children___internal___fieldOwners' |
  'childContentfulCourseDescriptionRichTextNode___children___internal___ignoreType' |
  'childContentfulCourseDescriptionRichTextNode___children___internal___mediaType' |
  'childContentfulCourseDescriptionRichTextNode___children___internal___owner' |
  'childContentfulCourseDescriptionRichTextNode___children___internal___type' |
  'childContentfulCourseDescriptionRichTextNode___internal___content' |
  'childContentfulCourseDescriptionRichTextNode___internal___contentDigest' |
  'childContentfulCourseDescriptionRichTextNode___internal___description' |
  'childContentfulCourseDescriptionRichTextNode___internal___fieldOwners' |
  'childContentfulCourseDescriptionRichTextNode___internal___ignoreType' |
  'childContentfulCourseDescriptionRichTextNode___internal___mediaType' |
  'childContentfulCourseDescriptionRichTextNode___internal___owner' |
  'childContentfulCourseDescriptionRichTextNode___internal___type' |
  'childContentfulCourseDescriptionRichTextNode___nodeType' |
  'childContentfulCourseDescriptionRichTextNode___content' |
  'childContentfulCourseDescriptionRichTextNode___content___nodeType' |
  'childContentfulCourseDescriptionRichTextNode___content___content' |
  'childContentfulCourseDescriptionRichTextNode___content___content___nodeType' |
  'childContentfulCourseDescriptionRichTextNode___content___content___value' |
  'childContentfulCourseDescriptionRichTextNode___description' |
  'childContentfulCourseDescriptionRichTextNode___fields___excerpt' |
  'childContentfulCourseDescriptionRichTextNode___json';

export type ContentfulCourseFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  courseId?: Maybe<StringQueryOperatorInput>;
  ects?: Maybe<IntQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<ContentfulCourseDescriptionRichTextNodeFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  contentful_id?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulCourseSysFilterInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  teacher?: Maybe<ContentfulTeacherFilterListInput>;
  major?: Maybe<ContentfulMajorFilterListInput>;
  childContentfulCourseDescriptionRichTextNode?: Maybe<ContentfulCourseDescriptionRichTextNodeFilterInput>;
};

export type ContentfulCourseFilterListInput = {
  elemMatch?: Maybe<ContentfulCourseFilterInput>;
};

export type ContentfulCourseGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulCourseEdge>;
  nodes: Array<ContentfulCourse>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulCourseSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulCourseFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulCourseSys = {
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulCourseSysContentType>;
};

export type ContentfulCourseSysContentType = {
  sys?: Maybe<ContentfulCourseSysContentTypeSys>;
};

export type ContentfulCourseSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulCourseSysContentTypeSysFilterInput>;
};

export type ContentfulCourseSysContentTypeSys = {
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  contentful_id?: Maybe<Scalars['String']>;
};

export type ContentfulCourseSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  contentful_id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulCourseSysFilterInput = {
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulCourseSysContentTypeFilterInput>;
};

export type ContentfulFixed = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
  height: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
};

export type ContentfulFixedFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  width?: Maybe<FloatQueryOperatorInput>;
  height?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulFluid = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  sizes: Scalars['String'];
};

export type ContentfulFluidFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
  sizes?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulImageCropFocus = 
  'TOP' |
  'TOP_LEFT' |
  'TOP_RIGHT' |
  'BOTTOM' |
  'BOTTOM_RIGHT' |
  'BOTTOM_LEFT' |
  'RIGHT' |
  'LEFT' |
  'FACE' |
  'FACES' |
  'CENTER';

export type ContentfulImageFormat = 
  'NO_CHANGE' |
  'JPG' |
  'PNG' |
  'WEBP';

export type ContentfulMajor = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  introduction?: Maybe<ContentfulMajorIntroductionRichTextNode>;
  spaceId?: Maybe<Scalars['String']>;
  contentful_id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulMajorSys>;
  node_locale?: Maybe<Scalars['String']>;
  courses?: Maybe<Array<Maybe<ContentfulCourse>>>;
  childContentfulMajorIntroductionRichTextNode?: Maybe<ContentfulMajorIntroductionRichTextNode>;
};


export type ContentfulMajorCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulMajorUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulMajorConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulMajorEdge>;
  nodes: Array<ContentfulMajor>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulMajorGroupConnection>;
};


export type ContentfulMajorConnectionDistinctArgs = {
  field: ContentfulMajorFieldsEnum;
};


export type ContentfulMajorConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulMajorFieldsEnum;
};

export type ContentfulMajorEdge = {
  next?: Maybe<ContentfulMajor>;
  node: ContentfulMajor;
  previous?: Maybe<ContentfulMajor>;
};

export type ContentfulMajorFieldsEnum = 
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type' |
  'name' |
  'slug' |
  'introduction___id' |
  'introduction___parent___id' |
  'introduction___parent___parent___id' |
  'introduction___parent___parent___children' |
  'introduction___parent___children' |
  'introduction___parent___children___id' |
  'introduction___parent___children___children' |
  'introduction___parent___internal___content' |
  'introduction___parent___internal___contentDigest' |
  'introduction___parent___internal___description' |
  'introduction___parent___internal___fieldOwners' |
  'introduction___parent___internal___ignoreType' |
  'introduction___parent___internal___mediaType' |
  'introduction___parent___internal___owner' |
  'introduction___parent___internal___type' |
  'introduction___children' |
  'introduction___children___id' |
  'introduction___children___parent___id' |
  'introduction___children___parent___children' |
  'introduction___children___children' |
  'introduction___children___children___id' |
  'introduction___children___children___children' |
  'introduction___children___internal___content' |
  'introduction___children___internal___contentDigest' |
  'introduction___children___internal___description' |
  'introduction___children___internal___fieldOwners' |
  'introduction___children___internal___ignoreType' |
  'introduction___children___internal___mediaType' |
  'introduction___children___internal___owner' |
  'introduction___children___internal___type' |
  'introduction___internal___content' |
  'introduction___internal___contentDigest' |
  'introduction___internal___description' |
  'introduction___internal___fieldOwners' |
  'introduction___internal___ignoreType' |
  'introduction___internal___mediaType' |
  'introduction___internal___owner' |
  'introduction___internal___type' |
  'introduction___content' |
  'introduction___content___content' |
  'introduction___content___content___value' |
  'introduction___content___content___nodeType' |
  'introduction___content___nodeType' |
  'introduction___nodeType' |
  'introduction___introduction' |
  'introduction___fields___excerpt' |
  'introduction___json' |
  'spaceId' |
  'contentful_id' |
  'createdAt' |
  'updatedAt' |
  'sys___revision' |
  'sys___contentType___sys___type' |
  'sys___contentType___sys___linkType' |
  'sys___contentType___sys___id' |
  'sys___contentType___sys___contentful_id' |
  'node_locale' |
  'courses' |
  'courses___id' |
  'courses___parent___id' |
  'courses___parent___parent___id' |
  'courses___parent___parent___children' |
  'courses___parent___children' |
  'courses___parent___children___id' |
  'courses___parent___children___children' |
  'courses___parent___internal___content' |
  'courses___parent___internal___contentDigest' |
  'courses___parent___internal___description' |
  'courses___parent___internal___fieldOwners' |
  'courses___parent___internal___ignoreType' |
  'courses___parent___internal___mediaType' |
  'courses___parent___internal___owner' |
  'courses___parent___internal___type' |
  'courses___children' |
  'courses___children___id' |
  'courses___children___parent___id' |
  'courses___children___parent___children' |
  'courses___children___children' |
  'courses___children___children___id' |
  'courses___children___children___children' |
  'courses___children___internal___content' |
  'courses___children___internal___contentDigest' |
  'courses___children___internal___description' |
  'courses___children___internal___fieldOwners' |
  'courses___children___internal___ignoreType' |
  'courses___children___internal___mediaType' |
  'courses___children___internal___owner' |
  'courses___children___internal___type' |
  'courses___internal___content' |
  'courses___internal___contentDigest' |
  'courses___internal___description' |
  'courses___internal___fieldOwners' |
  'courses___internal___ignoreType' |
  'courses___internal___mediaType' |
  'courses___internal___owner' |
  'courses___internal___type' |
  'courses___courseId' |
  'courses___ects' |
  'courses___name' |
  'courses___description___id' |
  'courses___description___parent___id' |
  'courses___description___parent___children' |
  'courses___description___children' |
  'courses___description___children___id' |
  'courses___description___children___children' |
  'courses___description___internal___content' |
  'courses___description___internal___contentDigest' |
  'courses___description___internal___description' |
  'courses___description___internal___fieldOwners' |
  'courses___description___internal___ignoreType' |
  'courses___description___internal___mediaType' |
  'courses___description___internal___owner' |
  'courses___description___internal___type' |
  'courses___description___nodeType' |
  'courses___description___content' |
  'courses___description___content___nodeType' |
  'courses___description___content___content' |
  'courses___description___description' |
  'courses___description___fields___excerpt' |
  'courses___description___json' |
  'courses___spaceId' |
  'courses___contentful_id' |
  'courses___createdAt' |
  'courses___updatedAt' |
  'courses___sys___revision' |
  'courses___node_locale' |
  'courses___teacher' |
  'courses___teacher___id' |
  'courses___teacher___parent___id' |
  'courses___teacher___parent___children' |
  'courses___teacher___children' |
  'courses___teacher___children___id' |
  'courses___teacher___children___children' |
  'courses___teacher___internal___content' |
  'courses___teacher___internal___contentDigest' |
  'courses___teacher___internal___description' |
  'courses___teacher___internal___fieldOwners' |
  'courses___teacher___internal___ignoreType' |
  'courses___teacher___internal___mediaType' |
  'courses___teacher___internal___owner' |
  'courses___teacher___internal___type' |
  'courses___teacher___name' |
  'courses___teacher___slug' |
  'courses___teacher___avatar___id' |
  'courses___teacher___avatar___children' |
  'courses___teacher___avatar___contentful_id' |
  'courses___teacher___avatar___title' |
  'courses___teacher___avatar___description' |
  'courses___teacher___avatar___node_locale' |
  'courses___teacher___spaceId' |
  'courses___teacher___contentful_id' |
  'courses___teacher___createdAt' |
  'courses___teacher___updatedAt' |
  'courses___teacher___sys___revision' |
  'courses___teacher___node_locale' |
  'courses___teacher___course' |
  'courses___teacher___course___id' |
  'courses___teacher___course___children' |
  'courses___teacher___course___courseId' |
  'courses___teacher___course___ects' |
  'courses___teacher___course___name' |
  'courses___teacher___course___spaceId' |
  'courses___teacher___course___contentful_id' |
  'courses___teacher___course___createdAt' |
  'courses___teacher___course___updatedAt' |
  'courses___teacher___course___node_locale' |
  'courses___teacher___course___teacher' |
  'courses___teacher___course___major' |
  'courses___major' |
  'courses___major___id' |
  'courses___major___parent___id' |
  'courses___major___parent___children' |
  'courses___major___children' |
  'courses___major___children___id' |
  'courses___major___children___children' |
  'courses___major___internal___content' |
  'courses___major___internal___contentDigest' |
  'courses___major___internal___description' |
  'courses___major___internal___fieldOwners' |
  'courses___major___internal___ignoreType' |
  'courses___major___internal___mediaType' |
  'courses___major___internal___owner' |
  'courses___major___internal___type' |
  'courses___major___name' |
  'courses___major___slug' |
  'courses___major___introduction___id' |
  'courses___major___introduction___children' |
  'courses___major___introduction___content' |
  'courses___major___introduction___nodeType' |
  'courses___major___introduction___introduction' |
  'courses___major___introduction___json' |
  'courses___major___spaceId' |
  'courses___major___contentful_id' |
  'courses___major___createdAt' |
  'courses___major___updatedAt' |
  'courses___major___sys___revision' |
  'courses___major___node_locale' |
  'courses___major___courses' |
  'courses___major___courses___id' |
  'courses___major___courses___children' |
  'courses___major___courses___courseId' |
  'courses___major___courses___ects' |
  'courses___major___courses___name' |
  'courses___major___courses___spaceId' |
  'courses___major___courses___contentful_id' |
  'courses___major___courses___createdAt' |
  'courses___major___courses___updatedAt' |
  'courses___major___courses___node_locale' |
  'courses___major___courses___teacher' |
  'courses___major___courses___major' |
  'courses___major___childContentfulMajorIntroductionRichTextNode___id' |
  'courses___major___childContentfulMajorIntroductionRichTextNode___children' |
  'courses___major___childContentfulMajorIntroductionRichTextNode___content' |
  'courses___major___childContentfulMajorIntroductionRichTextNode___nodeType' |
  'courses___major___childContentfulMajorIntroductionRichTextNode___introduction' |
  'courses___major___childContentfulMajorIntroductionRichTextNode___json' |
  'courses___childContentfulCourseDescriptionRichTextNode___id' |
  'courses___childContentfulCourseDescriptionRichTextNode___parent___id' |
  'courses___childContentfulCourseDescriptionRichTextNode___parent___children' |
  'courses___childContentfulCourseDescriptionRichTextNode___children' |
  'courses___childContentfulCourseDescriptionRichTextNode___children___id' |
  'courses___childContentfulCourseDescriptionRichTextNode___children___children' |
  'courses___childContentfulCourseDescriptionRichTextNode___internal___content' |
  'courses___childContentfulCourseDescriptionRichTextNode___internal___contentDigest' |
  'courses___childContentfulCourseDescriptionRichTextNode___internal___description' |
  'courses___childContentfulCourseDescriptionRichTextNode___internal___fieldOwners' |
  'courses___childContentfulCourseDescriptionRichTextNode___internal___ignoreType' |
  'courses___childContentfulCourseDescriptionRichTextNode___internal___mediaType' |
  'courses___childContentfulCourseDescriptionRichTextNode___internal___owner' |
  'courses___childContentfulCourseDescriptionRichTextNode___internal___type' |
  'courses___childContentfulCourseDescriptionRichTextNode___nodeType' |
  'courses___childContentfulCourseDescriptionRichTextNode___content' |
  'courses___childContentfulCourseDescriptionRichTextNode___content___nodeType' |
  'courses___childContentfulCourseDescriptionRichTextNode___content___content' |
  'courses___childContentfulCourseDescriptionRichTextNode___description' |
  'courses___childContentfulCourseDescriptionRichTextNode___fields___excerpt' |
  'courses___childContentfulCourseDescriptionRichTextNode___json' |
  'childContentfulMajorIntroductionRichTextNode___id' |
  'childContentfulMajorIntroductionRichTextNode___parent___id' |
  'childContentfulMajorIntroductionRichTextNode___parent___parent___id' |
  'childContentfulMajorIntroductionRichTextNode___parent___parent___children' |
  'childContentfulMajorIntroductionRichTextNode___parent___children' |
  'childContentfulMajorIntroductionRichTextNode___parent___children___id' |
  'childContentfulMajorIntroductionRichTextNode___parent___children___children' |
  'childContentfulMajorIntroductionRichTextNode___parent___internal___content' |
  'childContentfulMajorIntroductionRichTextNode___parent___internal___contentDigest' |
  'childContentfulMajorIntroductionRichTextNode___parent___internal___description' |
  'childContentfulMajorIntroductionRichTextNode___parent___internal___fieldOwners' |
  'childContentfulMajorIntroductionRichTextNode___parent___internal___ignoreType' |
  'childContentfulMajorIntroductionRichTextNode___parent___internal___mediaType' |
  'childContentfulMajorIntroductionRichTextNode___parent___internal___owner' |
  'childContentfulMajorIntroductionRichTextNode___parent___internal___type' |
  'childContentfulMajorIntroductionRichTextNode___children' |
  'childContentfulMajorIntroductionRichTextNode___children___id' |
  'childContentfulMajorIntroductionRichTextNode___children___parent___id' |
  'childContentfulMajorIntroductionRichTextNode___children___parent___children' |
  'childContentfulMajorIntroductionRichTextNode___children___children' |
  'childContentfulMajorIntroductionRichTextNode___children___children___id' |
  'childContentfulMajorIntroductionRichTextNode___children___children___children' |
  'childContentfulMajorIntroductionRichTextNode___children___internal___content' |
  'childContentfulMajorIntroductionRichTextNode___children___internal___contentDigest' |
  'childContentfulMajorIntroductionRichTextNode___children___internal___description' |
  'childContentfulMajorIntroductionRichTextNode___children___internal___fieldOwners' |
  'childContentfulMajorIntroductionRichTextNode___children___internal___ignoreType' |
  'childContentfulMajorIntroductionRichTextNode___children___internal___mediaType' |
  'childContentfulMajorIntroductionRichTextNode___children___internal___owner' |
  'childContentfulMajorIntroductionRichTextNode___children___internal___type' |
  'childContentfulMajorIntroductionRichTextNode___internal___content' |
  'childContentfulMajorIntroductionRichTextNode___internal___contentDigest' |
  'childContentfulMajorIntroductionRichTextNode___internal___description' |
  'childContentfulMajorIntroductionRichTextNode___internal___fieldOwners' |
  'childContentfulMajorIntroductionRichTextNode___internal___ignoreType' |
  'childContentfulMajorIntroductionRichTextNode___internal___mediaType' |
  'childContentfulMajorIntroductionRichTextNode___internal___owner' |
  'childContentfulMajorIntroductionRichTextNode___internal___type' |
  'childContentfulMajorIntroductionRichTextNode___content' |
  'childContentfulMajorIntroductionRichTextNode___content___content' |
  'childContentfulMajorIntroductionRichTextNode___content___content___value' |
  'childContentfulMajorIntroductionRichTextNode___content___content___nodeType' |
  'childContentfulMajorIntroductionRichTextNode___content___nodeType' |
  'childContentfulMajorIntroductionRichTextNode___nodeType' |
  'childContentfulMajorIntroductionRichTextNode___introduction' |
  'childContentfulMajorIntroductionRichTextNode___fields___excerpt' |
  'childContentfulMajorIntroductionRichTextNode___json';

export type ContentfulMajorFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  name?: Maybe<StringQueryOperatorInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  introduction?: Maybe<ContentfulMajorIntroductionRichTextNodeFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  contentful_id?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulMajorSysFilterInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  courses?: Maybe<ContentfulCourseFilterListInput>;
  childContentfulMajorIntroductionRichTextNode?: Maybe<ContentfulMajorIntroductionRichTextNodeFilterInput>;
};

export type ContentfulMajorFilterListInput = {
  elemMatch?: Maybe<ContentfulMajorFilterInput>;
};

export type ContentfulMajorGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulMajorEdge>;
  nodes: Array<ContentfulMajor>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulMajorIntroductionRichTextNode = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  content?: Maybe<Array<Maybe<ContentfulMajorIntroductionRichTextNodeContent>>>;
  /** @deprecated This field is deprecated, please use 'json' instead. */
  nodeType?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  fields?: Maybe<ContentfulMajorIntroductionRichTextNodeFields>;
  json?: Maybe<Scalars['JSON']>;
};

export type ContentfulMajorIntroductionRichTextNodeConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulMajorIntroductionRichTextNodeEdge>;
  nodes: Array<ContentfulMajorIntroductionRichTextNode>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulMajorIntroductionRichTextNodeGroupConnection>;
};


export type ContentfulMajorIntroductionRichTextNodeConnectionDistinctArgs = {
  field: ContentfulMajorIntroductionRichTextNodeFieldsEnum;
};


export type ContentfulMajorIntroductionRichTextNodeConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulMajorIntroductionRichTextNodeFieldsEnum;
};

export type ContentfulMajorIntroductionRichTextNodeContent = {
  content?: Maybe<Array<Maybe<ContentfulMajorIntroductionRichTextNodeContentContent>>>;
  nodeType?: Maybe<Scalars['String']>;
};

export type ContentfulMajorIntroductionRichTextNodeContentContent = {
  value?: Maybe<Scalars['String']>;
  nodeType?: Maybe<Scalars['String']>;
};

export type ContentfulMajorIntroductionRichTextNodeContentContentFilterInput = {
  value?: Maybe<StringQueryOperatorInput>;
  nodeType?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulMajorIntroductionRichTextNodeContentContentFilterListInput = {
  elemMatch?: Maybe<ContentfulMajorIntroductionRichTextNodeContentContentFilterInput>;
};

export type ContentfulMajorIntroductionRichTextNodeContentFilterInput = {
  content?: Maybe<ContentfulMajorIntroductionRichTextNodeContentContentFilterListInput>;
  nodeType?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulMajorIntroductionRichTextNodeContentFilterListInput = {
  elemMatch?: Maybe<ContentfulMajorIntroductionRichTextNodeContentFilterInput>;
};

export type ContentfulMajorIntroductionRichTextNodeEdge = {
  next?: Maybe<ContentfulMajorIntroductionRichTextNode>;
  node: ContentfulMajorIntroductionRichTextNode;
  previous?: Maybe<ContentfulMajorIntroductionRichTextNode>;
};

export type ContentfulMajorIntroductionRichTextNodeFields = {
  excerpt?: Maybe<Scalars['String']>;
};

export type ContentfulMajorIntroductionRichTextNodeFieldsEnum = 
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type' |
  'content' |
  'content___content' |
  'content___content___value' |
  'content___content___nodeType' |
  'content___nodeType' |
  'nodeType' |
  'introduction' |
  'fields___excerpt' |
  'json';

export type ContentfulMajorIntroductionRichTextNodeFieldsFilterInput = {
  excerpt?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulMajorIntroductionRichTextNodeFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  content?: Maybe<ContentfulMajorIntroductionRichTextNodeContentFilterListInput>;
  nodeType?: Maybe<StringQueryOperatorInput>;
  introduction?: Maybe<StringQueryOperatorInput>;
  fields?: Maybe<ContentfulMajorIntroductionRichTextNodeFieldsFilterInput>;
  json?: Maybe<JsonQueryOperatorInput>;
};

export type ContentfulMajorIntroductionRichTextNodeGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulMajorIntroductionRichTextNodeEdge>;
  nodes: Array<ContentfulMajorIntroductionRichTextNode>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulMajorIntroductionRichTextNodeSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulMajorIntroductionRichTextNodeFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulMajorSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulMajorFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulMajorSys = {
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulMajorSysContentType>;
};

export type ContentfulMajorSysContentType = {
  sys?: Maybe<ContentfulMajorSysContentTypeSys>;
};

export type ContentfulMajorSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulMajorSysContentTypeSysFilterInput>;
};

export type ContentfulMajorSysContentTypeSys = {
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  contentful_id?: Maybe<Scalars['String']>;
};

export type ContentfulMajorSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  contentful_id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulMajorSysFilterInput = {
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulMajorSysContentTypeFilterInput>;
};

export type ContentfulResize = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  aspectRatio?: Maybe<Scalars['Float']>;
};

export type ContentfulResizeFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  width?: Maybe<IntQueryOperatorInput>;
  height?: Maybe<IntQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
};

export type ContentfulResolutions = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
  height: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
};

export type ContentfulResolutionsFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  width?: Maybe<FloatQueryOperatorInput>;
  height?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulSizes = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  sizes: Scalars['String'];
};

export type ContentfulSizesFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
  sizes?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulTeacher = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  avatar?: Maybe<ContentfulAsset>;
  spaceId?: Maybe<Scalars['String']>;
  contentful_id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  sys?: Maybe<ContentfulTeacherSys>;
  node_locale?: Maybe<Scalars['String']>;
  course?: Maybe<Array<Maybe<ContentfulCourse>>>;
};


export type ContentfulTeacherCreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentfulTeacherUpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentfulTeacherConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTeacherEdge>;
  nodes: Array<ContentfulTeacher>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ContentfulTeacherGroupConnection>;
};


export type ContentfulTeacherConnectionDistinctArgs = {
  field: ContentfulTeacherFieldsEnum;
};


export type ContentfulTeacherConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ContentfulTeacherFieldsEnum;
};

export type ContentfulTeacherEdge = {
  next?: Maybe<ContentfulTeacher>;
  node: ContentfulTeacher;
  previous?: Maybe<ContentfulTeacher>;
};

export type ContentfulTeacherFieldsEnum = 
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type' |
  'name' |
  'slug' |
  'avatar___id' |
  'avatar___parent___id' |
  'avatar___parent___parent___id' |
  'avatar___parent___parent___children' |
  'avatar___parent___children' |
  'avatar___parent___children___id' |
  'avatar___parent___children___children' |
  'avatar___parent___internal___content' |
  'avatar___parent___internal___contentDigest' |
  'avatar___parent___internal___description' |
  'avatar___parent___internal___fieldOwners' |
  'avatar___parent___internal___ignoreType' |
  'avatar___parent___internal___mediaType' |
  'avatar___parent___internal___owner' |
  'avatar___parent___internal___type' |
  'avatar___children' |
  'avatar___children___id' |
  'avatar___children___parent___id' |
  'avatar___children___parent___children' |
  'avatar___children___children' |
  'avatar___children___children___id' |
  'avatar___children___children___children' |
  'avatar___children___internal___content' |
  'avatar___children___internal___contentDigest' |
  'avatar___children___internal___description' |
  'avatar___children___internal___fieldOwners' |
  'avatar___children___internal___ignoreType' |
  'avatar___children___internal___mediaType' |
  'avatar___children___internal___owner' |
  'avatar___children___internal___type' |
  'avatar___internal___content' |
  'avatar___internal___contentDigest' |
  'avatar___internal___description' |
  'avatar___internal___fieldOwners' |
  'avatar___internal___ignoreType' |
  'avatar___internal___mediaType' |
  'avatar___internal___owner' |
  'avatar___internal___type' |
  'avatar___contentful_id' |
  'avatar___file___url' |
  'avatar___file___details___size' |
  'avatar___file___fileName' |
  'avatar___file___contentType' |
  'avatar___title' |
  'avatar___description' |
  'avatar___node_locale' |
  'avatar___fixed___base64' |
  'avatar___fixed___tracedSVG' |
  'avatar___fixed___aspectRatio' |
  'avatar___fixed___width' |
  'avatar___fixed___height' |
  'avatar___fixed___src' |
  'avatar___fixed___srcSet' |
  'avatar___fixed___srcWebp' |
  'avatar___fixed___srcSetWebp' |
  'avatar___resolutions___base64' |
  'avatar___resolutions___tracedSVG' |
  'avatar___resolutions___aspectRatio' |
  'avatar___resolutions___width' |
  'avatar___resolutions___height' |
  'avatar___resolutions___src' |
  'avatar___resolutions___srcSet' |
  'avatar___resolutions___srcWebp' |
  'avatar___resolutions___srcSetWebp' |
  'avatar___fluid___base64' |
  'avatar___fluid___tracedSVG' |
  'avatar___fluid___aspectRatio' |
  'avatar___fluid___src' |
  'avatar___fluid___srcSet' |
  'avatar___fluid___srcWebp' |
  'avatar___fluid___srcSetWebp' |
  'avatar___fluid___sizes' |
  'avatar___sizes___base64' |
  'avatar___sizes___tracedSVG' |
  'avatar___sizes___aspectRatio' |
  'avatar___sizes___src' |
  'avatar___sizes___srcSet' |
  'avatar___sizes___srcWebp' |
  'avatar___sizes___srcSetWebp' |
  'avatar___sizes___sizes' |
  'avatar___resize___base64' |
  'avatar___resize___tracedSVG' |
  'avatar___resize___src' |
  'avatar___resize___width' |
  'avatar___resize___height' |
  'avatar___resize___aspectRatio' |
  'spaceId' |
  'contentful_id' |
  'createdAt' |
  'updatedAt' |
  'sys___revision' |
  'sys___contentType___sys___type' |
  'sys___contentType___sys___linkType' |
  'sys___contentType___sys___id' |
  'sys___contentType___sys___contentful_id' |
  'node_locale' |
  'course' |
  'course___id' |
  'course___parent___id' |
  'course___parent___parent___id' |
  'course___parent___parent___children' |
  'course___parent___children' |
  'course___parent___children___id' |
  'course___parent___children___children' |
  'course___parent___internal___content' |
  'course___parent___internal___contentDigest' |
  'course___parent___internal___description' |
  'course___parent___internal___fieldOwners' |
  'course___parent___internal___ignoreType' |
  'course___parent___internal___mediaType' |
  'course___parent___internal___owner' |
  'course___parent___internal___type' |
  'course___children' |
  'course___children___id' |
  'course___children___parent___id' |
  'course___children___parent___children' |
  'course___children___children' |
  'course___children___children___id' |
  'course___children___children___children' |
  'course___children___internal___content' |
  'course___children___internal___contentDigest' |
  'course___children___internal___description' |
  'course___children___internal___fieldOwners' |
  'course___children___internal___ignoreType' |
  'course___children___internal___mediaType' |
  'course___children___internal___owner' |
  'course___children___internal___type' |
  'course___internal___content' |
  'course___internal___contentDigest' |
  'course___internal___description' |
  'course___internal___fieldOwners' |
  'course___internal___ignoreType' |
  'course___internal___mediaType' |
  'course___internal___owner' |
  'course___internal___type' |
  'course___courseId' |
  'course___ects' |
  'course___name' |
  'course___description___id' |
  'course___description___parent___id' |
  'course___description___parent___children' |
  'course___description___children' |
  'course___description___children___id' |
  'course___description___children___children' |
  'course___description___internal___content' |
  'course___description___internal___contentDigest' |
  'course___description___internal___description' |
  'course___description___internal___fieldOwners' |
  'course___description___internal___ignoreType' |
  'course___description___internal___mediaType' |
  'course___description___internal___owner' |
  'course___description___internal___type' |
  'course___description___nodeType' |
  'course___description___content' |
  'course___description___content___nodeType' |
  'course___description___content___content' |
  'course___description___description' |
  'course___description___fields___excerpt' |
  'course___description___json' |
  'course___spaceId' |
  'course___contentful_id' |
  'course___createdAt' |
  'course___updatedAt' |
  'course___sys___revision' |
  'course___node_locale' |
  'course___teacher' |
  'course___teacher___id' |
  'course___teacher___parent___id' |
  'course___teacher___parent___children' |
  'course___teacher___children' |
  'course___teacher___children___id' |
  'course___teacher___children___children' |
  'course___teacher___internal___content' |
  'course___teacher___internal___contentDigest' |
  'course___teacher___internal___description' |
  'course___teacher___internal___fieldOwners' |
  'course___teacher___internal___ignoreType' |
  'course___teacher___internal___mediaType' |
  'course___teacher___internal___owner' |
  'course___teacher___internal___type' |
  'course___teacher___name' |
  'course___teacher___slug' |
  'course___teacher___avatar___id' |
  'course___teacher___avatar___children' |
  'course___teacher___avatar___contentful_id' |
  'course___teacher___avatar___title' |
  'course___teacher___avatar___description' |
  'course___teacher___avatar___node_locale' |
  'course___teacher___spaceId' |
  'course___teacher___contentful_id' |
  'course___teacher___createdAt' |
  'course___teacher___updatedAt' |
  'course___teacher___sys___revision' |
  'course___teacher___node_locale' |
  'course___teacher___course' |
  'course___teacher___course___id' |
  'course___teacher___course___children' |
  'course___teacher___course___courseId' |
  'course___teacher___course___ects' |
  'course___teacher___course___name' |
  'course___teacher___course___spaceId' |
  'course___teacher___course___contentful_id' |
  'course___teacher___course___createdAt' |
  'course___teacher___course___updatedAt' |
  'course___teacher___course___node_locale' |
  'course___teacher___course___teacher' |
  'course___teacher___course___major' |
  'course___major' |
  'course___major___id' |
  'course___major___parent___id' |
  'course___major___parent___children' |
  'course___major___children' |
  'course___major___children___id' |
  'course___major___children___children' |
  'course___major___internal___content' |
  'course___major___internal___contentDigest' |
  'course___major___internal___description' |
  'course___major___internal___fieldOwners' |
  'course___major___internal___ignoreType' |
  'course___major___internal___mediaType' |
  'course___major___internal___owner' |
  'course___major___internal___type' |
  'course___major___name' |
  'course___major___slug' |
  'course___major___introduction___id' |
  'course___major___introduction___children' |
  'course___major___introduction___content' |
  'course___major___introduction___nodeType' |
  'course___major___introduction___introduction' |
  'course___major___introduction___json' |
  'course___major___spaceId' |
  'course___major___contentful_id' |
  'course___major___createdAt' |
  'course___major___updatedAt' |
  'course___major___sys___revision' |
  'course___major___node_locale' |
  'course___major___courses' |
  'course___major___courses___id' |
  'course___major___courses___children' |
  'course___major___courses___courseId' |
  'course___major___courses___ects' |
  'course___major___courses___name' |
  'course___major___courses___spaceId' |
  'course___major___courses___contentful_id' |
  'course___major___courses___createdAt' |
  'course___major___courses___updatedAt' |
  'course___major___courses___node_locale' |
  'course___major___courses___teacher' |
  'course___major___courses___major' |
  'course___major___childContentfulMajorIntroductionRichTextNode___id' |
  'course___major___childContentfulMajorIntroductionRichTextNode___children' |
  'course___major___childContentfulMajorIntroductionRichTextNode___content' |
  'course___major___childContentfulMajorIntroductionRichTextNode___nodeType' |
  'course___major___childContentfulMajorIntroductionRichTextNode___introduction' |
  'course___major___childContentfulMajorIntroductionRichTextNode___json' |
  'course___childContentfulCourseDescriptionRichTextNode___id' |
  'course___childContentfulCourseDescriptionRichTextNode___parent___id' |
  'course___childContentfulCourseDescriptionRichTextNode___parent___children' |
  'course___childContentfulCourseDescriptionRichTextNode___children' |
  'course___childContentfulCourseDescriptionRichTextNode___children___id' |
  'course___childContentfulCourseDescriptionRichTextNode___children___children' |
  'course___childContentfulCourseDescriptionRichTextNode___internal___content' |
  'course___childContentfulCourseDescriptionRichTextNode___internal___contentDigest' |
  'course___childContentfulCourseDescriptionRichTextNode___internal___description' |
  'course___childContentfulCourseDescriptionRichTextNode___internal___fieldOwners' |
  'course___childContentfulCourseDescriptionRichTextNode___internal___ignoreType' |
  'course___childContentfulCourseDescriptionRichTextNode___internal___mediaType' |
  'course___childContentfulCourseDescriptionRichTextNode___internal___owner' |
  'course___childContentfulCourseDescriptionRichTextNode___internal___type' |
  'course___childContentfulCourseDescriptionRichTextNode___nodeType' |
  'course___childContentfulCourseDescriptionRichTextNode___content' |
  'course___childContentfulCourseDescriptionRichTextNode___content___nodeType' |
  'course___childContentfulCourseDescriptionRichTextNode___content___content' |
  'course___childContentfulCourseDescriptionRichTextNode___description' |
  'course___childContentfulCourseDescriptionRichTextNode___fields___excerpt' |
  'course___childContentfulCourseDescriptionRichTextNode___json';

export type ContentfulTeacherFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  name?: Maybe<StringQueryOperatorInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  avatar?: Maybe<ContentfulAssetFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  contentful_id?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTeacherSysFilterInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  course?: Maybe<ContentfulCourseFilterListInput>;
};

export type ContentfulTeacherFilterListInput = {
  elemMatch?: Maybe<ContentfulTeacherFilterInput>;
};

export type ContentfulTeacherGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ContentfulTeacherEdge>;
  nodes: Array<ContentfulTeacher>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ContentfulTeacherSortInput = {
  fields?: Maybe<Array<Maybe<ContentfulTeacherFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type ContentfulTeacherSys = {
  revision?: Maybe<Scalars['Int']>;
  contentType?: Maybe<ContentfulTeacherSysContentType>;
};

export type ContentfulTeacherSysContentType = {
  sys?: Maybe<ContentfulTeacherSysContentTypeSys>;
};

export type ContentfulTeacherSysContentTypeFilterInput = {
  sys?: Maybe<ContentfulTeacherSysContentTypeSysFilterInput>;
};

export type ContentfulTeacherSysContentTypeSys = {
  type?: Maybe<Scalars['String']>;
  linkType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  contentful_id?: Maybe<Scalars['String']>;
};

export type ContentfulTeacherSysContentTypeSysFilterInput = {
  type?: Maybe<StringQueryOperatorInput>;
  linkType?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  contentful_id?: Maybe<StringQueryOperatorInput>;
};

export type ContentfulTeacherSysFilterInput = {
  revision?: Maybe<IntQueryOperatorInput>;
  contentType?: Maybe<ContentfulTeacherSysContentTypeFilterInput>;
};


export type DateQueryOperatorInput = {
  eq?: Maybe<Scalars['Date']>;
  ne?: Maybe<Scalars['Date']>;
  gt?: Maybe<Scalars['Date']>;
  gte?: Maybe<Scalars['Date']>;
  lt?: Maybe<Scalars['Date']>;
  lte?: Maybe<Scalars['Date']>;
  in?: Maybe<Array<Maybe<Scalars['Date']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Date']>>>;
};

export type Directory = Node & {
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  blksize?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type DirectoryModifiedTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryAccessTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryChangeTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryBirthTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryAtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryMtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type DirectoryCtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type DirectoryConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<DirectoryGroupConnection>;
};


export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum;
};


export type DirectoryConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: DirectoryFieldsEnum;
};

export type DirectoryEdge = {
  next?: Maybe<Directory>;
  node: Directory;
  previous?: Maybe<Directory>;
};

export type DirectoryFieldsEnum = 
  'sourceInstanceName' |
  'absolutePath' |
  'relativePath' |
  'extension' |
  'size' |
  'prettySize' |
  'modifiedTime' |
  'accessTime' |
  'changeTime' |
  'birthTime' |
  'root' |
  'dir' |
  'base' |
  'ext' |
  'name' |
  'relativeDirectory' |
  'dev' |
  'mode' |
  'nlink' |
  'uid' |
  'gid' |
  'rdev' |
  'ino' |
  'atimeMs' |
  'mtimeMs' |
  'ctimeMs' |
  'atime' |
  'mtime' |
  'ctime' |
  'birthtime' |
  'birthtimeMs' |
  'blksize' |
  'blocks' |
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type';

export type DirectoryFilterInput = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>;
  absolutePath?: Maybe<StringQueryOperatorInput>;
  relativePath?: Maybe<StringQueryOperatorInput>;
  extension?: Maybe<StringQueryOperatorInput>;
  size?: Maybe<IntQueryOperatorInput>;
  prettySize?: Maybe<StringQueryOperatorInput>;
  modifiedTime?: Maybe<DateQueryOperatorInput>;
  accessTime?: Maybe<DateQueryOperatorInput>;
  changeTime?: Maybe<DateQueryOperatorInput>;
  birthTime?: Maybe<DateQueryOperatorInput>;
  root?: Maybe<StringQueryOperatorInput>;
  dir?: Maybe<StringQueryOperatorInput>;
  base?: Maybe<StringQueryOperatorInput>;
  ext?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  relativeDirectory?: Maybe<StringQueryOperatorInput>;
  dev?: Maybe<IntQueryOperatorInput>;
  mode?: Maybe<IntQueryOperatorInput>;
  nlink?: Maybe<IntQueryOperatorInput>;
  uid?: Maybe<IntQueryOperatorInput>;
  gid?: Maybe<IntQueryOperatorInput>;
  rdev?: Maybe<IntQueryOperatorInput>;
  ino?: Maybe<FloatQueryOperatorInput>;
  atimeMs?: Maybe<FloatQueryOperatorInput>;
  mtimeMs?: Maybe<FloatQueryOperatorInput>;
  ctimeMs?: Maybe<FloatQueryOperatorInput>;
  atime?: Maybe<DateQueryOperatorInput>;
  mtime?: Maybe<DateQueryOperatorInput>;
  ctime?: Maybe<DateQueryOperatorInput>;
  birthtime?: Maybe<DateQueryOperatorInput>;
  birthtimeMs?: Maybe<FloatQueryOperatorInput>;
  blksize?: Maybe<IntQueryOperatorInput>;
  blocks?: Maybe<IntQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type DirectoryGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<DirectoryEdge>;
  nodes: Array<Directory>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type DirectorySortInput = {
  fields?: Maybe<Array<Maybe<DirectoryFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type DuotoneGradient = {
  highlight: Scalars['String'];
  shadow: Scalars['String'];
  opacity?: Maybe<Scalars['Int']>;
};

export type File = Node & {
  sourceInstanceName: Scalars['String'];
  absolutePath: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  size: Scalars['Int'];
  prettySize: Scalars['String'];
  modifiedTime: Scalars['Date'];
  accessTime: Scalars['Date'];
  changeTime: Scalars['Date'];
  birthTime: Scalars['Date'];
  root: Scalars['String'];
  dir: Scalars['String'];
  base: Scalars['String'];
  ext: Scalars['String'];
  name: Scalars['String'];
  relativeDirectory: Scalars['String'];
  dev: Scalars['Int'];
  mode: Scalars['Int'];
  nlink: Scalars['Int'];
  uid: Scalars['Int'];
  gid: Scalars['Int'];
  rdev: Scalars['Int'];
  ino: Scalars['Float'];
  atimeMs: Scalars['Float'];
  mtimeMs: Scalars['Float'];
  ctimeMs: Scalars['Float'];
  atime: Scalars['Date'];
  mtime: Scalars['Date'];
  ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars['Float']>;
  blksize?: Maybe<Scalars['Int']>;
  blocks?: Maybe<Scalars['Int']>;
  /** Copy file to static directory and return public url to it */
  publicURL?: Maybe<Scalars['String']>;
  childImageSharp?: Maybe<ImageSharp>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type FileModifiedTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileAccessTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileChangeTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileBirthTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileAtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileMtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};


export type FileCtimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type FileConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<FileGroupConnection>;
};


export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum;
};


export type FileConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: FileFieldsEnum;
};

export type FileEdge = {
  next?: Maybe<File>;
  node: File;
  previous?: Maybe<File>;
};

export type FileFieldsEnum = 
  'sourceInstanceName' |
  'absolutePath' |
  'relativePath' |
  'extension' |
  'size' |
  'prettySize' |
  'modifiedTime' |
  'accessTime' |
  'changeTime' |
  'birthTime' |
  'root' |
  'dir' |
  'base' |
  'ext' |
  'name' |
  'relativeDirectory' |
  'dev' |
  'mode' |
  'nlink' |
  'uid' |
  'gid' |
  'rdev' |
  'ino' |
  'atimeMs' |
  'mtimeMs' |
  'ctimeMs' |
  'atime' |
  'mtime' |
  'ctime' |
  'birthtime' |
  'birthtimeMs' |
  'blksize' |
  'blocks' |
  'publicURL' |
  'childImageSharp___fixed___base64' |
  'childImageSharp___fixed___tracedSVG' |
  'childImageSharp___fixed___aspectRatio' |
  'childImageSharp___fixed___width' |
  'childImageSharp___fixed___height' |
  'childImageSharp___fixed___src' |
  'childImageSharp___fixed___srcSet' |
  'childImageSharp___fixed___srcWebp' |
  'childImageSharp___fixed___srcSetWebp' |
  'childImageSharp___fixed___originalName' |
  'childImageSharp___resolutions___base64' |
  'childImageSharp___resolutions___tracedSVG' |
  'childImageSharp___resolutions___aspectRatio' |
  'childImageSharp___resolutions___width' |
  'childImageSharp___resolutions___height' |
  'childImageSharp___resolutions___src' |
  'childImageSharp___resolutions___srcSet' |
  'childImageSharp___resolutions___srcWebp' |
  'childImageSharp___resolutions___srcSetWebp' |
  'childImageSharp___resolutions___originalName' |
  'childImageSharp___fluid___base64' |
  'childImageSharp___fluid___tracedSVG' |
  'childImageSharp___fluid___aspectRatio' |
  'childImageSharp___fluid___src' |
  'childImageSharp___fluid___srcSet' |
  'childImageSharp___fluid___srcWebp' |
  'childImageSharp___fluid___srcSetWebp' |
  'childImageSharp___fluid___sizes' |
  'childImageSharp___fluid___originalImg' |
  'childImageSharp___fluid___originalName' |
  'childImageSharp___fluid___presentationWidth' |
  'childImageSharp___fluid___presentationHeight' |
  'childImageSharp___sizes___base64' |
  'childImageSharp___sizes___tracedSVG' |
  'childImageSharp___sizes___aspectRatio' |
  'childImageSharp___sizes___src' |
  'childImageSharp___sizes___srcSet' |
  'childImageSharp___sizes___srcWebp' |
  'childImageSharp___sizes___srcSetWebp' |
  'childImageSharp___sizes___sizes' |
  'childImageSharp___sizes___originalImg' |
  'childImageSharp___sizes___originalName' |
  'childImageSharp___sizes___presentationWidth' |
  'childImageSharp___sizes___presentationHeight' |
  'childImageSharp___original___width' |
  'childImageSharp___original___height' |
  'childImageSharp___original___src' |
  'childImageSharp___resize___src' |
  'childImageSharp___resize___tracedSVG' |
  'childImageSharp___resize___width' |
  'childImageSharp___resize___height' |
  'childImageSharp___resize___aspectRatio' |
  'childImageSharp___resize___originalName' |
  'childImageSharp___id' |
  'childImageSharp___parent___id' |
  'childImageSharp___parent___parent___id' |
  'childImageSharp___parent___parent___children' |
  'childImageSharp___parent___children' |
  'childImageSharp___parent___children___id' |
  'childImageSharp___parent___children___children' |
  'childImageSharp___parent___internal___content' |
  'childImageSharp___parent___internal___contentDigest' |
  'childImageSharp___parent___internal___description' |
  'childImageSharp___parent___internal___fieldOwners' |
  'childImageSharp___parent___internal___ignoreType' |
  'childImageSharp___parent___internal___mediaType' |
  'childImageSharp___parent___internal___owner' |
  'childImageSharp___parent___internal___type' |
  'childImageSharp___children' |
  'childImageSharp___children___id' |
  'childImageSharp___children___parent___id' |
  'childImageSharp___children___parent___children' |
  'childImageSharp___children___children' |
  'childImageSharp___children___children___id' |
  'childImageSharp___children___children___children' |
  'childImageSharp___children___internal___content' |
  'childImageSharp___children___internal___contentDigest' |
  'childImageSharp___children___internal___description' |
  'childImageSharp___children___internal___fieldOwners' |
  'childImageSharp___children___internal___ignoreType' |
  'childImageSharp___children___internal___mediaType' |
  'childImageSharp___children___internal___owner' |
  'childImageSharp___children___internal___type' |
  'childImageSharp___internal___content' |
  'childImageSharp___internal___contentDigest' |
  'childImageSharp___internal___description' |
  'childImageSharp___internal___fieldOwners' |
  'childImageSharp___internal___ignoreType' |
  'childImageSharp___internal___mediaType' |
  'childImageSharp___internal___owner' |
  'childImageSharp___internal___type' |
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type';

export type FileFilterInput = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>;
  absolutePath?: Maybe<StringQueryOperatorInput>;
  relativePath?: Maybe<StringQueryOperatorInput>;
  extension?: Maybe<StringQueryOperatorInput>;
  size?: Maybe<IntQueryOperatorInput>;
  prettySize?: Maybe<StringQueryOperatorInput>;
  modifiedTime?: Maybe<DateQueryOperatorInput>;
  accessTime?: Maybe<DateQueryOperatorInput>;
  changeTime?: Maybe<DateQueryOperatorInput>;
  birthTime?: Maybe<DateQueryOperatorInput>;
  root?: Maybe<StringQueryOperatorInput>;
  dir?: Maybe<StringQueryOperatorInput>;
  base?: Maybe<StringQueryOperatorInput>;
  ext?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  relativeDirectory?: Maybe<StringQueryOperatorInput>;
  dev?: Maybe<IntQueryOperatorInput>;
  mode?: Maybe<IntQueryOperatorInput>;
  nlink?: Maybe<IntQueryOperatorInput>;
  uid?: Maybe<IntQueryOperatorInput>;
  gid?: Maybe<IntQueryOperatorInput>;
  rdev?: Maybe<IntQueryOperatorInput>;
  ino?: Maybe<FloatQueryOperatorInput>;
  atimeMs?: Maybe<FloatQueryOperatorInput>;
  mtimeMs?: Maybe<FloatQueryOperatorInput>;
  ctimeMs?: Maybe<FloatQueryOperatorInput>;
  atime?: Maybe<DateQueryOperatorInput>;
  mtime?: Maybe<DateQueryOperatorInput>;
  ctime?: Maybe<DateQueryOperatorInput>;
  birthtime?: Maybe<DateQueryOperatorInput>;
  birthtimeMs?: Maybe<FloatQueryOperatorInput>;
  blksize?: Maybe<IntQueryOperatorInput>;
  blocks?: Maybe<IntQueryOperatorInput>;
  publicURL?: Maybe<StringQueryOperatorInput>;
  childImageSharp?: Maybe<ImageSharpFilterInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type FileGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<FileEdge>;
  nodes: Array<File>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type FileSortInput = {
  fields?: Maybe<Array<Maybe<FileFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type FloatQueryOperatorInput = {
  eq?: Maybe<Scalars['Float']>;
  ne?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

export type ImageCropFocus = 
  'CENTER' |
  'NORTH' |
  'NORTHEAST' |
  'EAST' |
  'SOUTHEAST' |
  'SOUTH' |
  'SOUTHWEST' |
  'WEST' |
  'NORTHWEST' |
  'ENTROPY' |
  'ATTENTION';

export type ImageFit = 
  'COVER' |
  'CONTAIN' |
  'FILL' |
  'INSIDE' |
  'OUTSIDE';

export type ImageFormat = 
  'NO_CHANGE' |
  'JPG' |
  'PNG' |
  'WEBP';

export type ImageResizingBehavior = 
  'NO_CHANGE' |
  /** Same as the default resizing, but adds padding so that the generated image has the specified dimensions. */
  'PAD' |
  /** Crop a part of the original image to match the specified size. */
  'CROP' |
  /**
   * Crop the image to the specified dimensions, if the original image is smaller
   * than these dimensions, then the image will be upscaled.
   */
  'FILL' |
  /** When used in association with the f parameter below, creates a thumbnail from the image based on a focus area. */
  'THUMB' |
  /** Scale the image regardless of the original aspect ratio. */
  'SCALE';

export type ImageSharp = Node & {
  fixed?: Maybe<ImageSharpFixed>;
  /** @deprecated Resolutions was deprecated in Gatsby v2. It's been renamed to "fixed" https://example.com/write-docs-and-fix-this-example-link */
  resolutions?: Maybe<ImageSharpResolutions>;
  fluid?: Maybe<ImageSharpFluid>;
  /** @deprecated Sizes was deprecated in Gatsby v2. It's been renamed to "fluid" https://example.com/write-docs-and-fix-this-example-link */
  sizes?: Maybe<ImageSharpSizes>;
  original?: Maybe<ImageSharpOriginal>;
  resize?: Maybe<ImageSharpResize>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type ImageSharpFixedArgs = {
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  base64Width?: Maybe<Scalars['Int']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  duotone?: Maybe<DuotoneGradient>;
  traceSVG?: Maybe<Potrace>;
  quality?: Maybe<Scalars['Int']>;
  jpegQuality?: Maybe<Scalars['Int']>;
  pngQuality?: Maybe<Scalars['Int']>;
  webpQuality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
};


export type ImageSharpResolutionsArgs = {
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  base64Width?: Maybe<Scalars['Int']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  duotone?: Maybe<DuotoneGradient>;
  traceSVG?: Maybe<Potrace>;
  quality?: Maybe<Scalars['Int']>;
  jpegQuality?: Maybe<Scalars['Int']>;
  pngQuality?: Maybe<Scalars['Int']>;
  webpQuality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
};


export type ImageSharpFluidArgs = {
  maxWidth?: Maybe<Scalars['Int']>;
  maxHeight?: Maybe<Scalars['Int']>;
  base64Width?: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  duotone?: Maybe<DuotoneGradient>;
  traceSVG?: Maybe<Potrace>;
  quality?: Maybe<Scalars['Int']>;
  jpegQuality?: Maybe<Scalars['Int']>;
  pngQuality?: Maybe<Scalars['Int']>;
  webpQuality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
  sizes?: Maybe<Scalars['String']>;
  srcSetBreakpoints?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type ImageSharpSizesArgs = {
  maxWidth?: Maybe<Scalars['Int']>;
  maxHeight?: Maybe<Scalars['Int']>;
  base64Width?: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  duotone?: Maybe<DuotoneGradient>;
  traceSVG?: Maybe<Potrace>;
  quality?: Maybe<Scalars['Int']>;
  jpegQuality?: Maybe<Scalars['Int']>;
  pngQuality?: Maybe<Scalars['Int']>;
  webpQuality?: Maybe<Scalars['Int']>;
  toFormat?: Maybe<ImageFormat>;
  toFormatBase64?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
  sizes?: Maybe<Scalars['String']>;
  srcSetBreakpoints?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type ImageSharpResizeArgs = {
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  jpegQuality?: Maybe<Scalars['Int']>;
  pngQuality?: Maybe<Scalars['Int']>;
  webpQuality?: Maybe<Scalars['Int']>;
  jpegProgressive?: Maybe<Scalars['Boolean']>;
  pngCompressionLevel?: Maybe<Scalars['Int']>;
  pngCompressionSpeed?: Maybe<Scalars['Int']>;
  grayscale?: Maybe<Scalars['Boolean']>;
  duotone?: Maybe<DuotoneGradient>;
  base64?: Maybe<Scalars['Boolean']>;
  traceSVG?: Maybe<Potrace>;
  toFormat?: Maybe<ImageFormat>;
  cropFocus?: Maybe<ImageCropFocus>;
  fit?: Maybe<ImageFit>;
  background?: Maybe<Scalars['String']>;
  rotate?: Maybe<Scalars['Int']>;
  trim?: Maybe<Scalars['Float']>;
};

export type ImageSharpConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ImageSharpEdge>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<ImageSharpGroupConnection>;
};


export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum;
};


export type ImageSharpConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: ImageSharpFieldsEnum;
};

export type ImageSharpEdge = {
  next?: Maybe<ImageSharp>;
  node: ImageSharp;
  previous?: Maybe<ImageSharp>;
};

export type ImageSharpFieldsEnum = 
  'fixed___base64' |
  'fixed___tracedSVG' |
  'fixed___aspectRatio' |
  'fixed___width' |
  'fixed___height' |
  'fixed___src' |
  'fixed___srcSet' |
  'fixed___srcWebp' |
  'fixed___srcSetWebp' |
  'fixed___originalName' |
  'resolutions___base64' |
  'resolutions___tracedSVG' |
  'resolutions___aspectRatio' |
  'resolutions___width' |
  'resolutions___height' |
  'resolutions___src' |
  'resolutions___srcSet' |
  'resolutions___srcWebp' |
  'resolutions___srcSetWebp' |
  'resolutions___originalName' |
  'fluid___base64' |
  'fluid___tracedSVG' |
  'fluid___aspectRatio' |
  'fluid___src' |
  'fluid___srcSet' |
  'fluid___srcWebp' |
  'fluid___srcSetWebp' |
  'fluid___sizes' |
  'fluid___originalImg' |
  'fluid___originalName' |
  'fluid___presentationWidth' |
  'fluid___presentationHeight' |
  'sizes___base64' |
  'sizes___tracedSVG' |
  'sizes___aspectRatio' |
  'sizes___src' |
  'sizes___srcSet' |
  'sizes___srcWebp' |
  'sizes___srcSetWebp' |
  'sizes___sizes' |
  'sizes___originalImg' |
  'sizes___originalName' |
  'sizes___presentationWidth' |
  'sizes___presentationHeight' |
  'original___width' |
  'original___height' |
  'original___src' |
  'resize___src' |
  'resize___tracedSVG' |
  'resize___width' |
  'resize___height' |
  'resize___aspectRatio' |
  'resize___originalName' |
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type';

export type ImageSharpFilterInput = {
  fixed?: Maybe<ImageSharpFixedFilterInput>;
  resolutions?: Maybe<ImageSharpResolutionsFilterInput>;
  fluid?: Maybe<ImageSharpFluidFilterInput>;
  sizes?: Maybe<ImageSharpSizesFilterInput>;
  original?: Maybe<ImageSharpOriginalFilterInput>;
  resize?: Maybe<ImageSharpResizeFilterInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type ImageSharpFixed = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
  height: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  originalName?: Maybe<Scalars['String']>;
};

export type ImageSharpFixedFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  width?: Maybe<FloatQueryOperatorInput>;
  height?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
  originalName?: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpFluid = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  sizes: Scalars['String'];
  originalImg?: Maybe<Scalars['String']>;
  originalName?: Maybe<Scalars['String']>;
  presentationWidth?: Maybe<Scalars['Int']>;
  presentationHeight?: Maybe<Scalars['Int']>;
};

export type ImageSharpFluidFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
  sizes?: Maybe<StringQueryOperatorInput>;
  originalImg?: Maybe<StringQueryOperatorInput>;
  originalName?: Maybe<StringQueryOperatorInput>;
  presentationWidth?: Maybe<IntQueryOperatorInput>;
  presentationHeight?: Maybe<IntQueryOperatorInput>;
};

export type ImageSharpGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<ImageSharpEdge>;
  nodes: Array<ImageSharp>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type ImageSharpOriginal = {
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  src?: Maybe<Scalars['String']>;
};

export type ImageSharpOriginalFilterInput = {
  width?: Maybe<FloatQueryOperatorInput>;
  height?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpResize = {
  src?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  originalName?: Maybe<Scalars['String']>;
};

export type ImageSharpResizeFilterInput = {
  src?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  width?: Maybe<IntQueryOperatorInput>;
  height?: Maybe<IntQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  originalName?: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpResolutions = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio?: Maybe<Scalars['Float']>;
  width: Scalars['Float'];
  height: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  originalName?: Maybe<Scalars['String']>;
};

export type ImageSharpResolutionsFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  width?: Maybe<FloatQueryOperatorInput>;
  height?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
  originalName?: Maybe<StringQueryOperatorInput>;
};

export type ImageSharpSizes = {
  base64?: Maybe<Scalars['String']>;
  tracedSVG?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['Float'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  srcWebp?: Maybe<Scalars['String']>;
  srcSetWebp?: Maybe<Scalars['String']>;
  sizes: Scalars['String'];
  originalImg?: Maybe<Scalars['String']>;
  originalName?: Maybe<Scalars['String']>;
  presentationWidth?: Maybe<Scalars['Int']>;
  presentationHeight?: Maybe<Scalars['Int']>;
};

export type ImageSharpSizesFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>;
  tracedSVG?: Maybe<StringQueryOperatorInput>;
  aspectRatio?: Maybe<FloatQueryOperatorInput>;
  src?: Maybe<StringQueryOperatorInput>;
  srcSet?: Maybe<StringQueryOperatorInput>;
  srcWebp?: Maybe<StringQueryOperatorInput>;
  srcSetWebp?: Maybe<StringQueryOperatorInput>;
  sizes?: Maybe<StringQueryOperatorInput>;
  originalImg?: Maybe<StringQueryOperatorInput>;
  originalName?: Maybe<StringQueryOperatorInput>;
  presentationWidth?: Maybe<IntQueryOperatorInput>;
  presentationHeight?: Maybe<IntQueryOperatorInput>;
};

export type ImageSharpSortInput = {
  fields?: Maybe<Array<Maybe<ImageSharpFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type Internal = {
  content?: Maybe<Scalars['String']>;
  contentDigest: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fieldOwners?: Maybe<Array<Maybe<Scalars['String']>>>;
  ignoreType?: Maybe<Scalars['Boolean']>;
  mediaType?: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  type: Scalars['String'];
};

export type InternalFilterInput = {
  content?: Maybe<StringQueryOperatorInput>;
  contentDigest?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  fieldOwners?: Maybe<StringQueryOperatorInput>;
  ignoreType?: Maybe<BooleanQueryOperatorInput>;
  mediaType?: Maybe<StringQueryOperatorInput>;
  owner?: Maybe<StringQueryOperatorInput>;
  type?: Maybe<StringQueryOperatorInput>;
};

export type IntQueryOperatorInput = {
  eq?: Maybe<Scalars['Int']>;
  ne?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  nin?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type JsonQueryOperatorInput = {
  eq?: Maybe<Scalars['JSON']>;
  ne?: Maybe<Scalars['JSON']>;
  in?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  nin?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  regex?: Maybe<Scalars['JSON']>;
  glob?: Maybe<Scalars['JSON']>;
};

/** Node Interface */
export type Node = {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};

export type NodeFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type NodeFilterListInput = {
  elemMatch?: Maybe<NodeFilterInput>;
};

export type PageInfo = {
  currentPage: Scalars['Int'];
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  itemCount: Scalars['Int'];
  pageCount: Scalars['Int'];
  perPage?: Maybe<Scalars['Int']>;
};

export type Potrace = {
  turnPolicy?: Maybe<PotraceTurnPolicy>;
  turdSize?: Maybe<Scalars['Float']>;
  alphaMax?: Maybe<Scalars['Float']>;
  optCurve?: Maybe<Scalars['Boolean']>;
  optTolerance?: Maybe<Scalars['Float']>;
  threshold?: Maybe<Scalars['Int']>;
  blackOnWhite?: Maybe<Scalars['Boolean']>;
  color?: Maybe<Scalars['String']>;
  background?: Maybe<Scalars['String']>;
};

export type PotraceTurnPolicy = 
  'TURNPOLICY_BLACK' |
  'TURNPOLICY_WHITE' |
  'TURNPOLICY_LEFT' |
  'TURNPOLICY_RIGHT' |
  'TURNPOLICY_MINORITY' |
  'TURNPOLICY_MAJORITY';

export type Query = {
  file?: Maybe<File>;
  allFile: FileConnection;
  directory?: Maybe<Directory>;
  allDirectory: DirectoryConnection;
  sitePage?: Maybe<SitePage>;
  allSitePage: SitePageConnection;
  site?: Maybe<Site>;
  allSite: SiteConnection;
  imageSharp?: Maybe<ImageSharp>;
  allImageSharp: ImageSharpConnection;
  contentfulAsset?: Maybe<ContentfulAsset>;
  allContentfulAsset: ContentfulAssetConnection;
  contentfulMajorIntroductionRichTextNode?: Maybe<ContentfulMajorIntroductionRichTextNode>;
  allContentfulMajorIntroductionRichTextNode: ContentfulMajorIntroductionRichTextNodeConnection;
  contentfulMajor?: Maybe<ContentfulMajor>;
  allContentfulMajor: ContentfulMajorConnection;
  contentfulTeacher?: Maybe<ContentfulTeacher>;
  allContentfulTeacher: ContentfulTeacherConnection;
  contentfulCourseDescriptionRichTextNode?: Maybe<ContentfulCourseDescriptionRichTextNode>;
  allContentfulCourseDescriptionRichTextNode: ContentfulCourseDescriptionRichTextNodeConnection;
  contentfulCourse?: Maybe<ContentfulCourse>;
  allContentfulCourse: ContentfulCourseConnection;
  contentfulContentType?: Maybe<ContentfulContentType>;
  allContentfulContentType: ContentfulContentTypeConnection;
  siteBuildMetadata?: Maybe<SiteBuildMetadata>;
  allSiteBuildMetadata: SiteBuildMetadataConnection;
  sitePlugin?: Maybe<SitePlugin>;
  allSitePlugin: SitePluginConnection;
};


export type QueryFileArgs = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>;
  absolutePath?: Maybe<StringQueryOperatorInput>;
  relativePath?: Maybe<StringQueryOperatorInput>;
  extension?: Maybe<StringQueryOperatorInput>;
  size?: Maybe<IntQueryOperatorInput>;
  prettySize?: Maybe<StringQueryOperatorInput>;
  modifiedTime?: Maybe<DateQueryOperatorInput>;
  accessTime?: Maybe<DateQueryOperatorInput>;
  changeTime?: Maybe<DateQueryOperatorInput>;
  birthTime?: Maybe<DateQueryOperatorInput>;
  root?: Maybe<StringQueryOperatorInput>;
  dir?: Maybe<StringQueryOperatorInput>;
  base?: Maybe<StringQueryOperatorInput>;
  ext?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  relativeDirectory?: Maybe<StringQueryOperatorInput>;
  dev?: Maybe<IntQueryOperatorInput>;
  mode?: Maybe<IntQueryOperatorInput>;
  nlink?: Maybe<IntQueryOperatorInput>;
  uid?: Maybe<IntQueryOperatorInput>;
  gid?: Maybe<IntQueryOperatorInput>;
  rdev?: Maybe<IntQueryOperatorInput>;
  ino?: Maybe<FloatQueryOperatorInput>;
  atimeMs?: Maybe<FloatQueryOperatorInput>;
  mtimeMs?: Maybe<FloatQueryOperatorInput>;
  ctimeMs?: Maybe<FloatQueryOperatorInput>;
  atime?: Maybe<DateQueryOperatorInput>;
  mtime?: Maybe<DateQueryOperatorInput>;
  ctime?: Maybe<DateQueryOperatorInput>;
  birthtime?: Maybe<DateQueryOperatorInput>;
  birthtimeMs?: Maybe<FloatQueryOperatorInput>;
  blksize?: Maybe<IntQueryOperatorInput>;
  blocks?: Maybe<IntQueryOperatorInput>;
  publicURL?: Maybe<StringQueryOperatorInput>;
  childImageSharp?: Maybe<ImageSharpFilterInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllFileArgs = {
  filter?: Maybe<FileFilterInput>;
  sort?: Maybe<FileSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryDirectoryArgs = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>;
  absolutePath?: Maybe<StringQueryOperatorInput>;
  relativePath?: Maybe<StringQueryOperatorInput>;
  extension?: Maybe<StringQueryOperatorInput>;
  size?: Maybe<IntQueryOperatorInput>;
  prettySize?: Maybe<StringQueryOperatorInput>;
  modifiedTime?: Maybe<DateQueryOperatorInput>;
  accessTime?: Maybe<DateQueryOperatorInput>;
  changeTime?: Maybe<DateQueryOperatorInput>;
  birthTime?: Maybe<DateQueryOperatorInput>;
  root?: Maybe<StringQueryOperatorInput>;
  dir?: Maybe<StringQueryOperatorInput>;
  base?: Maybe<StringQueryOperatorInput>;
  ext?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  relativeDirectory?: Maybe<StringQueryOperatorInput>;
  dev?: Maybe<IntQueryOperatorInput>;
  mode?: Maybe<IntQueryOperatorInput>;
  nlink?: Maybe<IntQueryOperatorInput>;
  uid?: Maybe<IntQueryOperatorInput>;
  gid?: Maybe<IntQueryOperatorInput>;
  rdev?: Maybe<IntQueryOperatorInput>;
  ino?: Maybe<FloatQueryOperatorInput>;
  atimeMs?: Maybe<FloatQueryOperatorInput>;
  mtimeMs?: Maybe<FloatQueryOperatorInput>;
  ctimeMs?: Maybe<FloatQueryOperatorInput>;
  atime?: Maybe<DateQueryOperatorInput>;
  mtime?: Maybe<DateQueryOperatorInput>;
  ctime?: Maybe<DateQueryOperatorInput>;
  birthtime?: Maybe<DateQueryOperatorInput>;
  birthtimeMs?: Maybe<FloatQueryOperatorInput>;
  blksize?: Maybe<IntQueryOperatorInput>;
  blocks?: Maybe<IntQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllDirectoryArgs = {
  filter?: Maybe<DirectoryFilterInput>;
  sort?: Maybe<DirectorySortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySitePageArgs = {
  path?: Maybe<StringQueryOperatorInput>;
  component?: Maybe<StringQueryOperatorInput>;
  internalComponentName?: Maybe<StringQueryOperatorInput>;
  componentChunkName?: Maybe<StringQueryOperatorInput>;
  matchPath?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  isCreatedByStatefulCreatePages?: Maybe<BooleanQueryOperatorInput>;
  context?: Maybe<SitePageContextFilterInput>;
  pluginCreator?: Maybe<SitePluginFilterInput>;
  pluginCreatorId?: Maybe<StringQueryOperatorInput>;
  componentPath?: Maybe<StringQueryOperatorInput>;
};


export type QueryAllSitePageArgs = {
  filter?: Maybe<SitePageFilterInput>;
  sort?: Maybe<SitePageSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySiteArgs = {
  buildTime?: Maybe<DateQueryOperatorInput>;
  siteMetadata?: Maybe<SiteSiteMetadataFilterInput>;
  port?: Maybe<IntQueryOperatorInput>;
  host?: Maybe<StringQueryOperatorInput>;
  polyfill?: Maybe<BooleanQueryOperatorInput>;
  pathPrefix?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllSiteArgs = {
  filter?: Maybe<SiteFilterInput>;
  sort?: Maybe<SiteSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryImageSharpArgs = {
  fixed?: Maybe<ImageSharpFixedFilterInput>;
  resolutions?: Maybe<ImageSharpResolutionsFilterInput>;
  fluid?: Maybe<ImageSharpFluidFilterInput>;
  sizes?: Maybe<ImageSharpSizesFilterInput>;
  original?: Maybe<ImageSharpOriginalFilterInput>;
  resize?: Maybe<ImageSharpResizeFilterInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};


export type QueryAllImageSharpArgs = {
  filter?: Maybe<ImageSharpFilterInput>;
  sort?: Maybe<ImageSharpSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulAssetArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  contentful_id?: Maybe<StringQueryOperatorInput>;
  file?: Maybe<ContentfulAssetFileFilterInput>;
  title?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  fixed?: Maybe<ContentfulFixedFilterInput>;
  resolutions?: Maybe<ContentfulResolutionsFilterInput>;
  fluid?: Maybe<ContentfulFluidFilterInput>;
  sizes?: Maybe<ContentfulSizesFilterInput>;
  resize?: Maybe<ContentfulResizeFilterInput>;
};


export type QueryAllContentfulAssetArgs = {
  filter?: Maybe<ContentfulAssetFilterInput>;
  sort?: Maybe<ContentfulAssetSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulMajorIntroductionRichTextNodeArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  content?: Maybe<ContentfulMajorIntroductionRichTextNodeContentFilterListInput>;
  nodeType?: Maybe<StringQueryOperatorInput>;
  introduction?: Maybe<StringQueryOperatorInput>;
  fields?: Maybe<ContentfulMajorIntroductionRichTextNodeFieldsFilterInput>;
  json?: Maybe<JsonQueryOperatorInput>;
};


export type QueryAllContentfulMajorIntroductionRichTextNodeArgs = {
  filter?: Maybe<ContentfulMajorIntroductionRichTextNodeFilterInput>;
  sort?: Maybe<ContentfulMajorIntroductionRichTextNodeSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulMajorArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  name?: Maybe<StringQueryOperatorInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  introduction?: Maybe<ContentfulMajorIntroductionRichTextNodeFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  contentful_id?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulMajorSysFilterInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  courses?: Maybe<ContentfulCourseFilterListInput>;
  childContentfulMajorIntroductionRichTextNode?: Maybe<ContentfulMajorIntroductionRichTextNodeFilterInput>;
};


export type QueryAllContentfulMajorArgs = {
  filter?: Maybe<ContentfulMajorFilterInput>;
  sort?: Maybe<ContentfulMajorSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulTeacherArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  name?: Maybe<StringQueryOperatorInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  avatar?: Maybe<ContentfulAssetFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  contentful_id?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulTeacherSysFilterInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  course?: Maybe<ContentfulCourseFilterListInput>;
};


export type QueryAllContentfulTeacherArgs = {
  filter?: Maybe<ContentfulTeacherFilterInput>;
  sort?: Maybe<ContentfulTeacherSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulCourseDescriptionRichTextNodeArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  nodeType?: Maybe<StringQueryOperatorInput>;
  content?: Maybe<ContentfulCourseDescriptionRichTextNodeContentFilterListInput>;
  description?: Maybe<StringQueryOperatorInput>;
  fields?: Maybe<ContentfulCourseDescriptionRichTextNodeFieldsFilterInput>;
  json?: Maybe<JsonQueryOperatorInput>;
};


export type QueryAllContentfulCourseDescriptionRichTextNodeArgs = {
  filter?: Maybe<ContentfulCourseDescriptionRichTextNodeFilterInput>;
  sort?: Maybe<ContentfulCourseDescriptionRichTextNodeSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulCourseArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  courseId?: Maybe<StringQueryOperatorInput>;
  ects?: Maybe<IntQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<ContentfulCourseDescriptionRichTextNodeFilterInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  contentful_id?: Maybe<StringQueryOperatorInput>;
  createdAt?: Maybe<DateQueryOperatorInput>;
  updatedAt?: Maybe<DateQueryOperatorInput>;
  sys?: Maybe<ContentfulCourseSysFilterInput>;
  node_locale?: Maybe<StringQueryOperatorInput>;
  teacher?: Maybe<ContentfulTeacherFilterListInput>;
  major?: Maybe<ContentfulMajorFilterListInput>;
  childContentfulCourseDescriptionRichTextNode?: Maybe<ContentfulCourseDescriptionRichTextNodeFilterInput>;
};


export type QueryAllContentfulCourseArgs = {
  filter?: Maybe<ContentfulCourseFilterInput>;
  sort?: Maybe<ContentfulCourseSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContentfulContentTypeArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  name?: Maybe<StringQueryOperatorInput>;
  displayField?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
};


export type QueryAllContentfulContentTypeArgs = {
  filter?: Maybe<ContentfulContentTypeFilterInput>;
  sort?: Maybe<ContentfulContentTypeSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySiteBuildMetadataArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  buildTime?: Maybe<DateQueryOperatorInput>;
};


export type QueryAllSiteBuildMetadataArgs = {
  filter?: Maybe<SiteBuildMetadataFilterInput>;
  sort?: Maybe<SiteBuildMetadataSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySitePluginArgs = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  resolve?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
  pluginOptions?: Maybe<SitePluginPluginOptionsFilterInput>;
  nodeAPIs?: Maybe<StringQueryOperatorInput>;
  browserAPIs?: Maybe<StringQueryOperatorInput>;
  ssrAPIs?: Maybe<StringQueryOperatorInput>;
  pluginFilepath?: Maybe<StringQueryOperatorInput>;
  packageJson?: Maybe<SitePluginPackageJsonFilterInput>;
};


export type QueryAllSitePluginArgs = {
  filter?: Maybe<SitePluginFilterInput>;
  sort?: Maybe<SitePluginSortInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Site = Node & {
  buildTime?: Maybe<Scalars['Date']>;
  siteMetadata?: Maybe<SiteSiteMetadata>;
  port?: Maybe<Scalars['Int']>;
  host?: Maybe<Scalars['String']>;
  polyfill?: Maybe<Scalars['Boolean']>;
  pathPrefix?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
};


export type SiteBuildTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type SiteBuildMetadata = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  buildTime?: Maybe<Scalars['Date']>;
};


export type SiteBuildMetadataBuildTimeArgs = {
  formatString?: Maybe<Scalars['String']>;
  fromNow?: Maybe<Scalars['Boolean']>;
  difference?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
};

export type SiteBuildMetadataConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SiteBuildMetadataGroupConnection>;
};


export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


export type SiteBuildMetadataConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldsEnum;
};

export type SiteBuildMetadataEdge = {
  next?: Maybe<SiteBuildMetadata>;
  node: SiteBuildMetadata;
  previous?: Maybe<SiteBuildMetadata>;
};

export type SiteBuildMetadataFieldsEnum = 
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type' |
  'buildTime';

export type SiteBuildMetadataFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  buildTime?: Maybe<DateQueryOperatorInput>;
};

export type SiteBuildMetadataGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteBuildMetadataEdge>;
  nodes: Array<SiteBuildMetadata>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type SiteBuildMetadataSortInput = {
  fields?: Maybe<Array<Maybe<SiteBuildMetadataFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SiteConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SiteGroupConnection>;
};


export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum;
};


export type SiteConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: SiteFieldsEnum;
};

export type SiteEdge = {
  next?: Maybe<Site>;
  node: Site;
  previous?: Maybe<Site>;
};

export type SiteFieldsEnum = 
  'buildTime' |
  'siteMetadata___title' |
  'siteMetadata___description' |
  'siteMetadata___siteUrl' |
  'siteMetadata___author' |
  'port' |
  'host' |
  'polyfill' |
  'pathPrefix' |
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type';

export type SiteFilterInput = {
  buildTime?: Maybe<DateQueryOperatorInput>;
  siteMetadata?: Maybe<SiteSiteMetadataFilterInput>;
  port?: Maybe<IntQueryOperatorInput>;
  host?: Maybe<StringQueryOperatorInput>;
  polyfill?: Maybe<BooleanQueryOperatorInput>;
  pathPrefix?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
};

export type SiteGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type SitePage = Node & {
  path: Scalars['String'];
  component: Scalars['String'];
  internalComponentName: Scalars['String'];
  componentChunkName: Scalars['String'];
  matchPath?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  isCreatedByStatefulCreatePages?: Maybe<Scalars['Boolean']>;
  context?: Maybe<SitePageContext>;
  pluginCreator?: Maybe<SitePlugin>;
  pluginCreatorId?: Maybe<Scalars['String']>;
  componentPath?: Maybe<Scalars['String']>;
};

export type SitePageConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SitePageGroupConnection>;
};


export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum;
};


export type SitePageConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: SitePageFieldsEnum;
};

export type SitePageContext = {
  next?: Maybe<SitePageContextNext>;
  previous?: Maybe<SitePageContextPrevious>;
  slug?: Maybe<Scalars['String']>;
  courseId?: Maybe<Scalars['String']>;
};

export type SitePageContextFilterInput = {
  next?: Maybe<SitePageContextNextFilterInput>;
  previous?: Maybe<SitePageContextPreviousFilterInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  courseId?: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextNext = {
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  courseId?: Maybe<Scalars['String']>;
};

export type SitePageContextNextFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  courseId?: Maybe<StringQueryOperatorInput>;
};

export type SitePageContextPrevious = {
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  courseId?: Maybe<Scalars['String']>;
};

export type SitePageContextPreviousFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  slug?: Maybe<StringQueryOperatorInput>;
  courseId?: Maybe<StringQueryOperatorInput>;
};

export type SitePageEdge = {
  next?: Maybe<SitePage>;
  node: SitePage;
  previous?: Maybe<SitePage>;
};

export type SitePageFieldsEnum = 
  'path' |
  'component' |
  'internalComponentName' |
  'componentChunkName' |
  'matchPath' |
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type' |
  'isCreatedByStatefulCreatePages' |
  'context___next___name' |
  'context___next___id' |
  'context___next___slug' |
  'context___next___courseId' |
  'context___previous___name' |
  'context___previous___id' |
  'context___previous___slug' |
  'context___previous___courseId' |
  'context___slug' |
  'context___courseId' |
  'pluginCreator___id' |
  'pluginCreator___parent___id' |
  'pluginCreator___parent___parent___id' |
  'pluginCreator___parent___parent___children' |
  'pluginCreator___parent___children' |
  'pluginCreator___parent___children___id' |
  'pluginCreator___parent___children___children' |
  'pluginCreator___parent___internal___content' |
  'pluginCreator___parent___internal___contentDigest' |
  'pluginCreator___parent___internal___description' |
  'pluginCreator___parent___internal___fieldOwners' |
  'pluginCreator___parent___internal___ignoreType' |
  'pluginCreator___parent___internal___mediaType' |
  'pluginCreator___parent___internal___owner' |
  'pluginCreator___parent___internal___type' |
  'pluginCreator___children' |
  'pluginCreator___children___id' |
  'pluginCreator___children___parent___id' |
  'pluginCreator___children___parent___children' |
  'pluginCreator___children___children' |
  'pluginCreator___children___children___id' |
  'pluginCreator___children___children___children' |
  'pluginCreator___children___internal___content' |
  'pluginCreator___children___internal___contentDigest' |
  'pluginCreator___children___internal___description' |
  'pluginCreator___children___internal___fieldOwners' |
  'pluginCreator___children___internal___ignoreType' |
  'pluginCreator___children___internal___mediaType' |
  'pluginCreator___children___internal___owner' |
  'pluginCreator___children___internal___type' |
  'pluginCreator___internal___content' |
  'pluginCreator___internal___contentDigest' |
  'pluginCreator___internal___description' |
  'pluginCreator___internal___fieldOwners' |
  'pluginCreator___internal___ignoreType' |
  'pluginCreator___internal___mediaType' |
  'pluginCreator___internal___owner' |
  'pluginCreator___internal___type' |
  'pluginCreator___resolve' |
  'pluginCreator___name' |
  'pluginCreator___version' |
  'pluginCreator___pluginOptions___name' |
  'pluginCreator___pluginOptions___path' |
  'pluginCreator___pluginOptions___short_name' |
  'pluginCreator___pluginOptions___start_url' |
  'pluginCreator___pluginOptions___background_color' |
  'pluginCreator___pluginOptions___theme_color' |
  'pluginCreator___pluginOptions___display' |
  'pluginCreator___pluginOptions___icon' |
  'pluginCreator___pluginOptions___spaceId' |
  'pluginCreator___pluginOptions___accessToken' |
  'pluginCreator___pluginOptions___fonts' |
  'pluginCreator___pluginOptions___fonts___family' |
  'pluginCreator___pluginOptions___fileName' |
  'pluginCreator___pluginOptions___pathCheck' |
  'pluginCreator___nodeAPIs' |
  'pluginCreator___browserAPIs' |
  'pluginCreator___ssrAPIs' |
  'pluginCreator___pluginFilepath' |
  'pluginCreator___packageJson___name' |
  'pluginCreator___packageJson___description' |
  'pluginCreator___packageJson___version' |
  'pluginCreator___packageJson___main' |
  'pluginCreator___packageJson___author' |
  'pluginCreator___packageJson___license' |
  'pluginCreator___packageJson___dependencies' |
  'pluginCreator___packageJson___dependencies___name' |
  'pluginCreator___packageJson___dependencies___version' |
  'pluginCreator___packageJson___devDependencies' |
  'pluginCreator___packageJson___devDependencies___name' |
  'pluginCreator___packageJson___devDependencies___version' |
  'pluginCreator___packageJson___peerDependencies' |
  'pluginCreator___packageJson___peerDependencies___name' |
  'pluginCreator___packageJson___peerDependencies___version' |
  'pluginCreator___packageJson___keywords' |
  'pluginCreatorId' |
  'componentPath';

export type SitePageFilterInput = {
  path?: Maybe<StringQueryOperatorInput>;
  component?: Maybe<StringQueryOperatorInput>;
  internalComponentName?: Maybe<StringQueryOperatorInput>;
  componentChunkName?: Maybe<StringQueryOperatorInput>;
  matchPath?: Maybe<StringQueryOperatorInput>;
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  isCreatedByStatefulCreatePages?: Maybe<BooleanQueryOperatorInput>;
  context?: Maybe<SitePageContextFilterInput>;
  pluginCreator?: Maybe<SitePluginFilterInput>;
  pluginCreatorId?: Maybe<StringQueryOperatorInput>;
  componentPath?: Maybe<StringQueryOperatorInput>;
};

export type SitePageGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type SitePageSortInput = {
  fields?: Maybe<Array<Maybe<SitePageFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SitePlugin = Node & {
  id: Scalars['ID'];
  parent?: Maybe<Node>;
  children: Array<Node>;
  internal: Internal;
  resolve?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  pluginOptions?: Maybe<SitePluginPluginOptions>;
  nodeAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  browserAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  ssrAPIs?: Maybe<Array<Maybe<Scalars['String']>>>;
  pluginFilepath?: Maybe<Scalars['String']>;
  packageJson?: Maybe<SitePluginPackageJson>;
};

export type SitePluginConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<Scalars['String']>;
  group: Array<SitePluginGroupConnection>;
};


export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum;
};


export type SitePluginConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  field: SitePluginFieldsEnum;
};

export type SitePluginEdge = {
  next?: Maybe<SitePlugin>;
  node: SitePlugin;
  previous?: Maybe<SitePlugin>;
};

export type SitePluginFieldsEnum = 
  'id' |
  'parent___id' |
  'parent___parent___id' |
  'parent___parent___parent___id' |
  'parent___parent___parent___children' |
  'parent___parent___children' |
  'parent___parent___children___id' |
  'parent___parent___children___children' |
  'parent___parent___internal___content' |
  'parent___parent___internal___contentDigest' |
  'parent___parent___internal___description' |
  'parent___parent___internal___fieldOwners' |
  'parent___parent___internal___ignoreType' |
  'parent___parent___internal___mediaType' |
  'parent___parent___internal___owner' |
  'parent___parent___internal___type' |
  'parent___children' |
  'parent___children___id' |
  'parent___children___parent___id' |
  'parent___children___parent___children' |
  'parent___children___children' |
  'parent___children___children___id' |
  'parent___children___children___children' |
  'parent___children___internal___content' |
  'parent___children___internal___contentDigest' |
  'parent___children___internal___description' |
  'parent___children___internal___fieldOwners' |
  'parent___children___internal___ignoreType' |
  'parent___children___internal___mediaType' |
  'parent___children___internal___owner' |
  'parent___children___internal___type' |
  'parent___internal___content' |
  'parent___internal___contentDigest' |
  'parent___internal___description' |
  'parent___internal___fieldOwners' |
  'parent___internal___ignoreType' |
  'parent___internal___mediaType' |
  'parent___internal___owner' |
  'parent___internal___type' |
  'children' |
  'children___id' |
  'children___parent___id' |
  'children___parent___parent___id' |
  'children___parent___parent___children' |
  'children___parent___children' |
  'children___parent___children___id' |
  'children___parent___children___children' |
  'children___parent___internal___content' |
  'children___parent___internal___contentDigest' |
  'children___parent___internal___description' |
  'children___parent___internal___fieldOwners' |
  'children___parent___internal___ignoreType' |
  'children___parent___internal___mediaType' |
  'children___parent___internal___owner' |
  'children___parent___internal___type' |
  'children___children' |
  'children___children___id' |
  'children___children___parent___id' |
  'children___children___parent___children' |
  'children___children___children' |
  'children___children___children___id' |
  'children___children___children___children' |
  'children___children___internal___content' |
  'children___children___internal___contentDigest' |
  'children___children___internal___description' |
  'children___children___internal___fieldOwners' |
  'children___children___internal___ignoreType' |
  'children___children___internal___mediaType' |
  'children___children___internal___owner' |
  'children___children___internal___type' |
  'children___internal___content' |
  'children___internal___contentDigest' |
  'children___internal___description' |
  'children___internal___fieldOwners' |
  'children___internal___ignoreType' |
  'children___internal___mediaType' |
  'children___internal___owner' |
  'children___internal___type' |
  'internal___content' |
  'internal___contentDigest' |
  'internal___description' |
  'internal___fieldOwners' |
  'internal___ignoreType' |
  'internal___mediaType' |
  'internal___owner' |
  'internal___type' |
  'resolve' |
  'name' |
  'version' |
  'pluginOptions___name' |
  'pluginOptions___path' |
  'pluginOptions___short_name' |
  'pluginOptions___start_url' |
  'pluginOptions___background_color' |
  'pluginOptions___theme_color' |
  'pluginOptions___display' |
  'pluginOptions___icon' |
  'pluginOptions___spaceId' |
  'pluginOptions___accessToken' |
  'pluginOptions___fonts' |
  'pluginOptions___fonts___family' |
  'pluginOptions___fileName' |
  'pluginOptions___pathCheck' |
  'nodeAPIs' |
  'browserAPIs' |
  'ssrAPIs' |
  'pluginFilepath' |
  'packageJson___name' |
  'packageJson___description' |
  'packageJson___version' |
  'packageJson___main' |
  'packageJson___author' |
  'packageJson___license' |
  'packageJson___dependencies' |
  'packageJson___dependencies___name' |
  'packageJson___dependencies___version' |
  'packageJson___devDependencies' |
  'packageJson___devDependencies___name' |
  'packageJson___devDependencies___version' |
  'packageJson___peerDependencies' |
  'packageJson___peerDependencies___name' |
  'packageJson___peerDependencies___version' |
  'packageJson___keywords';

export type SitePluginFilterInput = {
  id?: Maybe<StringQueryOperatorInput>;
  parent?: Maybe<NodeFilterInput>;
  children?: Maybe<NodeFilterListInput>;
  internal?: Maybe<InternalFilterInput>;
  resolve?: Maybe<StringQueryOperatorInput>;
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
  pluginOptions?: Maybe<SitePluginPluginOptionsFilterInput>;
  nodeAPIs?: Maybe<StringQueryOperatorInput>;
  browserAPIs?: Maybe<StringQueryOperatorInput>;
  ssrAPIs?: Maybe<StringQueryOperatorInput>;
  pluginFilepath?: Maybe<StringQueryOperatorInput>;
  packageJson?: Maybe<SitePluginPackageJsonFilterInput>;
};

export type SitePluginGroupConnection = {
  totalCount: Scalars['Int'];
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  field: Scalars['String'];
  fieldValue?: Maybe<Scalars['String']>;
};

export type SitePluginPackageJson = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  main?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  license?: Maybe<Scalars['String']>;
  dependencies?: Maybe<Array<Maybe<SitePluginPackageJsonDependencies>>>;
  devDependencies?: Maybe<Array<Maybe<SitePluginPackageJsonDevDependencies>>>;
  peerDependencies?: Maybe<Array<Maybe<SitePluginPackageJsonPeerDependencies>>>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SitePluginPackageJsonDependencies = {
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type SitePluginPackageJsonDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonDependenciesFilterInput>;
};

export type SitePluginPackageJsonDevDependencies = {
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type SitePluginPackageJsonDevDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonDevDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonDevDependenciesFilterInput>;
};

export type SitePluginPackageJsonFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
  main?: Maybe<StringQueryOperatorInput>;
  author?: Maybe<StringQueryOperatorInput>;
  license?: Maybe<StringQueryOperatorInput>;
  dependencies?: Maybe<SitePluginPackageJsonDependenciesFilterListInput>;
  devDependencies?: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>;
  peerDependencies?: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>;
  keywords?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonPeerDependencies = {
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type SitePluginPackageJsonPeerDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  version?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonPeerDependenciesFilterInput>;
};

export type SitePluginPluginOptions = {
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  short_name?: Maybe<Scalars['String']>;
  start_url?: Maybe<Scalars['String']>;
  background_color?: Maybe<Scalars['String']>;
  theme_color?: Maybe<Scalars['String']>;
  display?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  spaceId?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  fonts?: Maybe<Array<Maybe<SitePluginPluginOptionsFonts>>>;
  fileName?: Maybe<Scalars['String']>;
  pathCheck?: Maybe<Scalars['Boolean']>;
};

export type SitePluginPluginOptionsFilterInput = {
  name?: Maybe<StringQueryOperatorInput>;
  path?: Maybe<StringQueryOperatorInput>;
  short_name?: Maybe<StringQueryOperatorInput>;
  start_url?: Maybe<StringQueryOperatorInput>;
  background_color?: Maybe<StringQueryOperatorInput>;
  theme_color?: Maybe<StringQueryOperatorInput>;
  display?: Maybe<StringQueryOperatorInput>;
  icon?: Maybe<StringQueryOperatorInput>;
  spaceId?: Maybe<StringQueryOperatorInput>;
  accessToken?: Maybe<StringQueryOperatorInput>;
  fonts?: Maybe<SitePluginPluginOptionsFontsFilterListInput>;
  fileName?: Maybe<StringQueryOperatorInput>;
  pathCheck?: Maybe<BooleanQueryOperatorInput>;
};

export type SitePluginPluginOptionsFonts = {
  family?: Maybe<Scalars['String']>;
};

export type SitePluginPluginOptionsFontsFilterInput = {
  family?: Maybe<StringQueryOperatorInput>;
};

export type SitePluginPluginOptionsFontsFilterListInput = {
  elemMatch?: Maybe<SitePluginPluginOptionsFontsFilterInput>;
};

export type SitePluginSortInput = {
  fields?: Maybe<Array<Maybe<SitePluginFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SiteSiteMetadata = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  siteUrl?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
};

export type SiteSiteMetadataFilterInput = {
  title?: Maybe<StringQueryOperatorInput>;
  description?: Maybe<StringQueryOperatorInput>;
  siteUrl?: Maybe<StringQueryOperatorInput>;
  author?: Maybe<StringQueryOperatorInput>;
};

export type SiteSortInput = {
  fields?: Maybe<Array<Maybe<SiteFieldsEnum>>>;
  order?: Maybe<Array<Maybe<SortOrderEnum>>>;
};

export type SortOrderEnum = 
  'ASC' |
  'DESC';

export type StringQueryOperatorInput = {
  eq?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  regex?: Maybe<Scalars['String']>;
  glob?: Maybe<Scalars['String']>;
};

export type Unnamed_1_QueryVariables = {};


export type Unnamed_1_Query = { placeholderImage?: Maybe<{ childImageSharp?: Maybe<{ fluid?: Maybe<GatsbyImageSharpFluidFragment> }> }> };

export type SiteTitleQueryQueryVariables = {};


export type SiteTitleQueryQuery = { site?: Maybe<{ siteMetadata?: Maybe<Pick<SiteSiteMetadata, 'title'>> }> };

export type Unnamed_2_QueryVariables = {};


export type Unnamed_2_Query = { site?: Maybe<{ siteMetadata?: Maybe<Pick<SiteSiteMetadata, 'title' | 'description' | 'author'>> }> };

export type AllCoursesQueryQueryVariables = {};


export type AllCoursesQueryQuery = { allContentfulCourse: { edges: Array<{ node: Pick<ContentfulCourse, 'name' | 'id'> }> } };

export type AllMajorsQueryQueryVariables = {};


export type AllMajorsQueryQuery = { allContentfulMajor: { edges: Array<{ node: (
        Pick<ContentfulMajor, 'name' | 'id' | 'slug'>
        & { introduction?: Maybe<Pick<ContentfulMajorIntroductionRichTextNode, 'json'>>, courses?: Maybe<Array<Maybe<(
          Pick<ContentfulCourse, 'name' | 'courseId' | 'ects'>
          & { teacher?: Maybe<Array<Maybe<{ avatar?: Maybe<{ fluid?: Maybe<Pick<ContentfulFluid, 'srcSet'>> }> }>>> }
        )>>> }
      ) }> } };

export type AllTeachersQueryQueryVariables = {};


export type AllTeachersQueryQuery = { allContentfulTeacher: { edges: Array<{ node: Pick<ContentfulTeacher, 'id' | 'name'> }> } };

export type Unnamed_3_QueryVariables = {
  courseId: Scalars['String'];
};


export type Unnamed_3_Query = { contentfulCourse?: Maybe<(
    Pick<ContentfulCourse, 'name' | 'id' | 'ects' | 'courseId' | 'createdAt' | 'updatedAt'>
    & { description?: Maybe<(
      Pick<ContentfulCourseDescriptionRichTextNode, 'json'>
      & { fields?: Maybe<Pick<ContentfulCourseDescriptionRichTextNodeFields, 'excerpt'>> }
    )>, teacher?: Maybe<Array<Maybe<Pick<ContentfulTeacher, 'slug' | 'name'>>>>, major?: Maybe<Array<Maybe<Pick<ContentfulMajor, 'slug' | 'name'>>>> }
  )> };

export type MajorBySlugQueryVariables = {
  slug: Scalars['String'];
};


export type MajorBySlugQuery = { contentfulMajor?: Maybe<(
    Pick<ContentfulMajor, 'id' | 'slug' | 'name' | 'createdAt' | 'updatedAt'>
    & { introduction?: Maybe<(
      Pick<ContentfulMajorIntroductionRichTextNode, 'json'>
      & { fields?: Maybe<Pick<ContentfulMajorIntroductionRichTextNodeFields, 'excerpt'>> }
    )>, courses?: Maybe<Array<Maybe<(
      Pick<ContentfulCourse, 'name' | 'courseId' | 'ects'>
      & { teacher?: Maybe<Array<Maybe<(
        Pick<ContentfulTeacher, 'id'>
        & { avatar?: Maybe<{ fluid?: Maybe<Pick<ContentfulFluid, 'srcSet'>> }> }
      )>>> }
    )>>> }
  )> };

export type Unnamed_4_QueryVariables = {
  slug: Scalars['String'];
};


export type Unnamed_4_Query = { contentfulTeacher?: Maybe<(
    Pick<ContentfulTeacher, 'id' | 'slug' | 'name' | 'createdAt' | 'updatedAt'>
    & { course?: Maybe<Array<Maybe<Pick<ContentfulCourse, 'id' | 'name' | 'courseId'>>>> }
  )> };

export type GatsbyContentfulFixedFragment = Pick<ContentfulFixed, 'base64' | 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyContentfulFixed_TracedSvgFragment = Pick<ContentfulFixed, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyContentfulFixed_NoBase64Fragment = Pick<ContentfulFixed, 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyContentfulFixed_WithWebpFragment = Pick<ContentfulFixed, 'base64' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyContentfulFixed_WithWebp_NoBase64Fragment = Pick<ContentfulFixed, 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyContentfulFluidFragment = Pick<ContentfulFluid, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyContentfulFluid_TracedSvgFragment = Pick<ContentfulFluid, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyContentfulFluid_NoBase64Fragment = Pick<ContentfulFluid, 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyContentfulFluid_WithWebpFragment = Pick<ContentfulFluid, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;

export type GatsbyContentfulFluid_WithWebp_NoBase64Fragment = Pick<ContentfulFluid, 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;

export type GatsbyContentfulResolutionsFragment = Pick<ContentfulResolutions, 'base64' | 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyContentfulResolutions_TracedSvgFragment = Pick<ContentfulResolutions, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyContentfulResolutions_NoBase64Fragment = Pick<ContentfulResolutions, 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyContentfulResolutions_WithWebpFragment = Pick<ContentfulResolutions, 'base64' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyContentfulResolutions_WithWebp_NoBase64Fragment = Pick<ContentfulResolutions, 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyContentfulSizesFragment = Pick<ContentfulSizes, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyContentfulSizes_TracedSvgFragment = Pick<ContentfulSizes, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyContentfulSizes_NoBase64Fragment = Pick<ContentfulSizes, 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyContentfulSizes_WithWebpFragment = Pick<ContentfulSizes, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;

export type GatsbyContentfulSizes_WithWebp_NoBase64Fragment = Pick<ContentfulSizes, 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;

export type GatsbyImageSharpFixedFragment = Pick<ImageSharpFixed, 'base64' | 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyImageSharpFixed_TracedSvgFragment = Pick<ImageSharpFixed, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyImageSharpFixed_WithWebpFragment = Pick<ImageSharpFixed, 'base64' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyImageSharpFixed_WithWebp_TracedSvgFragment = Pick<ImageSharpFixed, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyImageSharpFixed_NoBase64Fragment = Pick<ImageSharpFixed, 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyImageSharpFixed_WithWebp_NoBase64Fragment = Pick<ImageSharpFixed, 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyImageSharpFluidFragment = Pick<ImageSharpFluid, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyImageSharpFluid_TracedSvgFragment = Pick<ImageSharpFluid, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyImageSharpFluid_WithWebpFragment = Pick<ImageSharpFluid, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;

export type GatsbyImageSharpFluid_WithWebp_TracedSvgFragment = Pick<ImageSharpFluid, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;

export type GatsbyImageSharpFluid_NoBase64Fragment = Pick<ImageSharpFluid, 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyImageSharpFluid_WithWebp_NoBase64Fragment = Pick<ImageSharpFluid, 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;

export type GatsbyImageSharpResolutionsFragment = Pick<ImageSharpResolutions, 'base64' | 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyImageSharpResolutions_TracedSvgFragment = Pick<ImageSharpResolutions, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyImageSharpResolutions_WithWebpFragment = Pick<ImageSharpResolutions, 'base64' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyImageSharpResolutions_WithWebp_TracedSvgFragment = Pick<ImageSharpResolutions, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyImageSharpResolutions_NoBase64Fragment = Pick<ImageSharpResolutions, 'width' | 'height' | 'src' | 'srcSet'>;

export type GatsbyImageSharpResolutions_WithWebp_NoBase64Fragment = Pick<ImageSharpResolutions, 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>;

export type GatsbyImageSharpSizesFragment = Pick<ImageSharpSizes, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyImageSharpSizes_TracedSvgFragment = Pick<ImageSharpSizes, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyImageSharpSizes_WithWebpFragment = Pick<ImageSharpSizes, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;

export type GatsbyImageSharpSizes_WithWebp_TracedSvgFragment = Pick<ImageSharpSizes, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;

export type GatsbyImageSharpSizes_NoBase64Fragment = Pick<ImageSharpSizes, 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>;

export type GatsbyImageSharpSizes_WithWebp_NoBase64Fragment = Pick<ImageSharpSizes, 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>;