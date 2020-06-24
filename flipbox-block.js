var InspectorControls = wp.blockEditor.InspectorControls;
var PanelBody = wp.components.PanelBody;
var TextControl = wp.components.TextareaControl;
var TextareaControl = wp.components.TextareaControl;
var ColorPalette = wp.components.ColorPalette;
var __            = wp.i18n.__;
var RangeControl = wp.components.RangeControl;
var ColorIndicator = wp.components.ColorIndicator;
var Icon = wp.components.Icon;
var MediaUpload = wp.blockEditor.MediaUpload;
var Button = wp.components.Button;
var FocalPointPicker = wp.components.FocalPointPicker;
var FontSizePicker = wp.components.FontSizePicker;

var el = wp.element.createElement;


const colors = [
        { name: 'red', color: '#f00' },
        { name: 'white', color: '#fff' },
        { name: 'blue', color: '#00f' },
    ];
const textLenghtLimit = 50;  

wp.blocks.registerBlockType('federico/flip-box', {
  title: 'Flip Box',
  icon: 'images-alt2',
  category: 'layout',
  attributes: {
    frontText: {type: 'string'},
    frontTextColor: {type: 'string', default: '#7d8593'},
    backText: {type: 'string'},
    backTextColor: {type: 'string', default: '#7d8593'},    
    frontBgColor: {
      type: 'string',
      default: '#ffffff'  
    },
    backBgColor: {
      type: 'string',
      default: '#ffffff'  
    },
    cardBorderRadius: {
      type: 'number',
      default: 0
    },
    bgImageFront: {
      type: 'string'
    },
    bgImageBack: {
      type: 'string'
    },
    mediaFrontObject: { type: 'object'},
    mediaBackObject: { type: 'object'},
    focalPointFrontSide: { 
      default: {x: 0.5, y: 0.5,}
    },
    focalPointBackSide: {
      default: {x: 0.5, y: 0.5,}
    },
    fontIconSizeFront: { type: 'number'},
    fontIconSizeBack: { type: 'number'},
  },
  edit: function(props) {

    var attributes = props.attributes;

    function updateBorderRadius(value) {
      props.setAttributes({cardBorderRadius: value})
    }

    function onRemoveImage ( media ) {
       if( media.target.className.indexOf("back-side") > -1 ) {
        props.setAttributes({ bgImageBack: undefined });
       } else {
        props.setAttributes({ bgImageFront: undefined });
       }
    };

    function checkTextLenght(varText) {
      if ( varText ) {
        return ((varText).length > textLenghtLimit) ? (((varText).substring(0,textLenghtLimit-3)) + '...') : varText;  
      } else {
        return null;
      }
    }
   
    const flipCardFrontAttributes = { 
                                      borderRadius: attributes.cardBorderRadius, 
                                      fontSize: attributes.fontIconSizeFront+"px",
                                      backgroundColor: attributes.frontBgColor,
                                      backgroundImage: (attributes.bgImageFront) ? 'url('+attributes.bgImageFront+')' : 'none' ,
                                      backgroundPosition: `${ attributes.focalPointFrontSide.x * 100 }% ${ attributes.focalPointFrontSide.y * 100 }%` 
                                    };
    
    const flipCardBackAttributes = { 
                                      borderRadius: attributes.cardBorderRadius,
                                      fontSize: attributes.fontIconSizeBack+"px", 
                                      backgroundColor: attributes.backBgColor,
                                      backgroundImage: (attributes.bgImageBack) ? 'url('+attributes.bgImageBack+')' : 'none' ,
                                      backgroundPosition: `${ attributes.focalPointBackSide.x * 100 }% ${ attributes.focalPointBackSide.y * 100 }%` 
                                    };

    const fontStylesFrontsidePanel = [
              el(
                PanelBody,
                {
                  title: __('Font Styles Frontside'),
                  initialOpen: false
                },
                el(
                  "label", 
                    { class: 'components-base-control'},
                    'Font Color'
                ),
                el(
                  ColorIndicator, 
                    { colorValue: attributes.frontTextColor}
                ),
                
                el(
                  ColorPalette,
                  {
                    colors: colors,
                    value: attributes.frontTextColor,
                    onChange: function( newColor ) {
                      props.setAttributes({ frontTextColor: newColor })  
                    },
                  }
                ),
                el(
                  "label", 
                    { class: 'components-base-control font-size'},
                    'Font Size'
                ),
                el(
                  FontSizePicker,
                  { 
                    withSlider: true,
                    value: attributes.fontIconSizeFront,
                    fallbackFontSize: 12,
                    onChange: function( newFontSize ) {
                      props.setAttributes({fontIconSizeFront: newFontSize});
                    },
                  }
                ), 
              ),   
    ];

    const fontStylesBacksidePanel = [ 
      el(
          PanelBody,
          {
            title: __('Font Styles Backside'),
            initialOpen: false
          },
          el(
          "label", 
            { class: 'components-base-control'},
            'Font Color'
            ),
            el(
              ColorIndicator, 
                { colorValue: attributes.backTextColor}
            ),
            el(
              ColorPalette,
              {
                colors: colors,
                value: attributes.backTextColor,
                onChange: function( newColor ) {
                  props.setAttributes({ backTextColor: newColor })  
                },
              }
            ),
          el(
            "label", 
              { class: 'components-base-control font-size'},
              'Font Size'
          ),
          el(
            FontSizePicker,
            { withSlider: true,
              value: attributes.fontIconSizeBack,
              fallbackFontSize: 12,
              onChange: function( newFontSize ) {
                props.setAttributes({fontIconSizeBack: newFontSize});
              },
            }
          ), 
        ), 
    ];                               


    const controls = [
          el(
            InspectorControls,
            null,
            el(
              PanelBody,
              {
                title: __('Text Settings'),
                initialOpen: true
              },
              el(
                TextareaControl,
                {
                  label: __('Frontside Content'),
                  Type: String,
                  value: attributes.frontText,
                  onChange: function( newText ) {
                    props.setAttributes({ frontText: newText })  
                  },
                }
              ),
              fontStylesFrontsidePanel,
              el(
                TextareaControl,
                {
                  label: __('Backside Content'),
                  Type: String,
                  value: attributes.backText, 
                  onChange: function( newText ) {
                    props.setAttributes({ backText: newText })  
                  },
                }
              ),
               fontStylesBacksidePanel,     
            ),
            el(
              PanelBody,
              {
                title: __('General Settings'),
                initialOpen: false
              },
              el(
                RangeControl, 
                  {
                    label: __('Border Radius'),
                    value: attributes.cardBorderRadius,
                    min: 0,
                    max: 50,
                    onChange: function( newValue ) {
                      props.setAttributes({cardBorderRadius: newValue});
                    },
                  } 
              ),
            ),
            el(
              PanelBody,
              {
                title: __('Frontside Card Settings'),
                initialOpen: false
              },
              el(
                "label", 
                  { class: 'components-base-control'},
                  'Background Color Frontside'
              ),
              el(
                ColorPalette,
                {
                  colors: colors,
                  value: attributes.frontBgColor,
                  onChange: function( newColor ) {
                    props.setAttributes({ frontBgColor: newColor }) 
                  },
                }
              ),

              el(
                "div",
                { class: "wrapper-media" },
                   el(
                    "label", 
                      { class: 'components-base-control media-label'},
                      'Background Image Frontside'
                  ),
                  el( 
                  MediaUpload, 
                  { 
                    onSelect: function( NewbgImageFront ) {
                                props.setAttributes({mediaFrontObject: NewbgImageFront});
                                props.setAttributes({bgImageFront: NewbgImageFront.url});
                              },
                    type: 'image',
                    render: function( obj ) {
                      return el(
                              "div",
                              null, 
                               ! attributes.bgImageFront &&
                                    el(
                                      Button, 
                                      { className: 'components-button is-button is-primary front-side',
                                        onClick: obj.open },
                                      "Upload Image"
                                    ),//end crate button  
                                
                                attributes.bgImageFront &&
                                  el(
                                    Button, 
                                    { className: 'components-button is-button is-destructive front-side',
                                      onClick: onRemoveImage },
                                    "Remove Image"
                                  ),//end crate button 
                                attributes.bgImageFront &&
                                  el(
                                    FocalPointPicker,
                                    {
                                      label: __('Background position'),
                                      url:  attributes.mediaFrontObject.url,
                                      dimensions: { height: attributes.mediaFrontObject.height, width: attributes.mediaFrontObject.width },
                                      value: attributes.focalPointFrontSide,
                                      onChange: function( newPosition ) {
                                        props.setAttributes({ focalPointFrontSide: newPosition });
                                      },
                                    }
                                  ),                                 
                            ); //end div button  
                      } // end render
                    }// end editor
                  ),// end create mediaupload        
                  
                ),  // end wrapper  
              ),

            el(
              PanelBody,
              {
                title: __('Backside Card Settings'),
                initialOpen: false
              },
              el(
                "label", 
                  { class: 'components-base-control'},
                  'Background Color Backside'
              ),
              el(
                ColorPalette,
                {
                  colors: colors,
                  value: attributes.backBgColor,
                  onChange: function( newColor ) {
                    props.setAttributes({ backBgColor: newColor }) 
                  },
                }
              ),


              el(
                "div",
                { class: "wrapper-media" },
                   el(
                    "label", 
                      { class: 'components-base-control media-label'},
                      'Background Image Backside'
                  ),
                  el( 
                  MediaUpload, 
                  { 
                    onSelect: function( NewbgImageFront ) {
                                props.setAttributes({mediaBackObject: NewbgImageFront});
                                props.setAttributes({bgImageBack: NewbgImageFront.url});
                              },
                    type: 'image',
                    render: function( obj ) {
                      return el(
                              "div",
                              null, 
                               ! attributes.bgImageBack &&
                                    el(
                                      Button, 
                                      { className: 'components-button is-button is-primary back-side',
                                        onClick: obj.open },
                                      "Upload Image"
                                    ),//end crate button  
                                
                                attributes.bgImageBack &&
                                  el(
                                    Button, 
                                    { className: 'components-button is-button is-destructive back-side',
                                      onClick: onRemoveImage },
                                    "Remove Image"
                                  ),//end crate button 
                                attributes.bgImageBack &&
                                  el(
                                    FocalPointPicker,
                                    {
                                      label: __('Background position'),
                                      url:  attributes.mediaBackObject.url,
                                      dimensions: { height: attributes.mediaBackObject.height, width: attributes.mediaBackObject.width },
                                      value: attributes.focalPointBackSide,
                                      onChange: function( newPosition ) {
                                        props.setAttributes({ focalPointBackSide: newPosition });
                                      },
                                    }
                                  ),                                 
                            ); //end div button  
                      } // end render
                    }// end editor
                  ),// end create mediaupload        
                ),              
            ),
          ),
        ];

    return [
          controls,
            el(
            "div",
            { class: 'flip-card' },
              el(
                "div",
                { class: 'flip-card-inner',
                  style: { borderRadius: attributes.cardBorderRadius }
                },
                el(
                  "div", 
                  { class: "flip-card-front", 
                    style: flipCardFrontAttributes
                  },
                  el(
                    "div",
                    { class: 'inner-text', style: { color: attributes.frontTextColor} },
                    checkTextLenght(attributes.frontText)
                  ),
                ),
                el(
                  "div", 
                  { class: "flip-card-back", 
                    style: flipCardBackAttributes
                  },
                  el(
                    "div",
                    { class: 'inner-text', 
                      style: { 
                        color: attributes.backTextColor,
                        borderRadius: attributes.cardBorderRadius
                      }
                    },
                    checkTextLenght(attributes.backText)
                  ),
                ),
              ),
            )
            
      ];
  },
  save: function(props) {

    var attributes = props.attributes;

    const flipCardFrontAttributes = { 
                                      borderRadius: attributes.cardBorderRadius, 
                                      fontSize: attributes.fontIconSizeFront+"px",
                                      backgroundColor: attributes.frontBgColor,
                                      backgroundImage: (attributes.bgImageFront) ? 'url('+attributes.bgImageFront+')' : 'none' ,
                                      backgroundPosition: `${ attributes.focalPointFrontSide.x * 100 }% ${ attributes.focalPointFrontSide.y * 100 }%` 
                                    };

    const flipCardBackAttributes = { 
                                      borderRadius: attributes.cardBorderRadius, 
                                      fontSize: attributes.fontIconSizeBack+"px",
                                      backgroundColor: attributes.backBgColor,
                                      backgroundImage: (attributes.bgImageBack) ? 'url('+attributes.bgImageBack+')' : 'none' ,
                                      backgroundPosition: `${ attributes.focalPointBackSide.x * 100 }% ${ attributes.focalPointBackSide.y * 100 }%` 
                                    };                                    

    return el(
      "div",
      null,
      // elements starts
      el(
      "div",
      { class: 'flip-card' },
        el(
          "div",
          { class: 'flip-card-inner',
            style: { borderRadius: attributes.cardBorderRadius }
          },
          el(
            "div", 
            { class: "flip-card-front", style: flipCardFrontAttributes },
            el(
              "div",
              { class: 'inner-text', 
                style: { 
                  color: attributes.frontTextColor,
                  borderRadius: attributes.cardBorderRadius
                }  
              },
              attributes.frontText
            ),  
          ),
          el(
            "div", 
            { class: "flip-card-back", style: flipCardBackAttributes },
            el(
              "div",
              { class: 'inner-text', 
                style: { 
                  color: attributes.backTextColor
                }  
              },
              attributes.backText
            ), 
          ),
        ),
      )
      // elements ends    
    );
  }
})