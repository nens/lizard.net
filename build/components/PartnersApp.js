/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('underscore');
var $ = require('jquery');

var Row = require('react-bootstrap').Row;
var Input = require('react-bootstrap').Input;
var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var ModalTrigger = require('react-bootstrap').ModalTrigger;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Button = require('react-bootstrap').Button;

var Modal = require('react-bootstrap').Modal;
var Badge = require('react-bootstrap').Badge;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Table = require('react-bootstrap').Table;
var DateTimePicker = require('react-widgets').DateTimePicker;

require("!style!css!./PartnersApp.css");

var partnerList = require('./partners/data/partners.js');
var iso;

React.initializeTouchEvents(true);
window.React = React; // React DevTools won't work without this






var PartnersApp = React.createClass({


    componentDidMount: function() {
        iso = new Isotope('#content', {
            layoutMode: 'fitRows'
        });
        $('#filterinput').focus();
    },

    handleClick: function(e) {
        var filterValue = $(e.target).val();
        if(filterValue) {
          iso.arrange({
              filter: filterValue
          });          
        } else {
          iso.arrange({
              filter: ''
          });          
        }
    },
    handleFilter: function(e) {
      var filterValue = this.refs.filter.getValue();
      iso.arrange({
        filter: function(f) {
          var currentTitle = $(f).find('.repo-title a').text();
          if( currentTitle.toLowerCase().indexOf(filterValue.toLowerCase()) != -1) {
            return true;
          } else {
            return false;
          }
        }
      });
    },
    handleSort: function(e) {
        var sortValue = $(e.target).val();
        iso.arrange({
            sortBy: sortValue
        });
    },
    render: function() {
        return (
          <div>
            <Grid className="">
                <Row className="subHead">
                  <Col xs={0} md={6} style={{padding:'0 0 20px 40px'}}>
                    <p><strong>Categorie</strong></p>
                    <p>
                      <Button bsStyle="link" onClick={this.handleClick} style={{textDecoration:'underline !important',fontWeight:'bold'}} value="">Alles</Button>,&nbsp;                    
                      <Button bsStyle="link" onClick={this.handleClick} style={{textDecoration:'underline !important',fontWeight:'bold'}} value=".Bedrijf">Bedrijf</Button>,&nbsp;
                      <Button bsStyle="link" onClick={this.handleClick} style={{textDecoration:'underline !important',fontWeight:'bold'}} value=".Standaard">Standaard</Button>,&nbsp;                      
                      <Button bsStyle="link" onClick={this.handleClick} style={{textDecoration:'underline !important',fontWeight:'bold'}} value=".Professioneel">Professioneel</Button>,&nbsp;
                      <Button bsStyle="link" onClick={this.handleClick} style={{textDecoration:'underline !important',fontWeight:'bold'}} value=".Grondwater">Grondwater</Button>,&nbsp;
                      <Button bsStyle="link" onClick={this.handleClick} style={{textDecoration:'underline !important',fontWeight:'bold'}} value=".Basis">Basis</Button>,&nbsp;
                      <Button bsStyle="link" onClick={this.handleClick} style={{textDecoration:'underline !important',fontWeight:'bold'}} value=".Ontwikkelaar">Ontwikkelaar</Button>,&nbsp;                      
                      <Button bsStyle="link" onClick={this.handleClick} style={{textDecoration:'underline !important',fontWeight:'bold'}} value=".Samenwerking">Samenwerking</Button>,&nbsp;
                      <Button bsStyle="link" onClick={this.handleClick} style={{textDecoration:'underline !important',fontWeight:'bold'}} value=".Waterschap">Waterschap</Button>,&nbsp;
                      <Button bsStyle="link" onClick={this.handleClick} style={{textDecoration:'underline !important',fontWeight:'bold'}} value=".Provincie">Provincie</Button>,&nbsp;
                      <Button bsStyle="link" onClick={this.handleClick} style={{textDecoration:'underline !important',fontWeight:'bold'}} value=".Gemeente">Gemeente</Button>.
                    </p>
                  </Col>
                  <Col xs={6} md={6} className="sort">
                    <Input
                     id="filterinput"
                     type="text"
                     placeholder="Typ hier een (deel) van de naam"
                     label="Filter"
                     hasFeedback
                     groupClassName='group-class'
                     labelClassName='label-class'                     
                     ref="filter" 
                     onChange={this.handleFilter} />
                  </Col>                  
                </Row>
              </Grid>
              <Grid>
                  <Partners data={partnerList} />
              </Grid>
            </div>
        );
    }

});


var Partners = React.createClass({

  render: function() {
    var partnerNodes = this.props.data.map(function(partner) {
      return (
        <Partner
          key={partner.id}
          name={partner.name} 
          roles={partner.roles}
          phoneA={partner.phoneA}
          phoneB={partner.phoneB}
          email={partner.email}
          profilepic={partner.profilepic}
          description={partner.description} />
      )
    });

    return (
      <div id="content">
        {partnerNodes}
      </div>
    )
  }

});


var Partner = React.createClass({

  render: function() {

    var isotopeClasses = 'repo-container element ' + this.props.roles;
    var repoClasses = 'repo ' + this.props.key;

    var imgfilename = this.props.name.replace(/ /g, '-').replace(/&/, '');
    var imgUrl = '/images/partners/'+imgfilename+'.png';
    var divStyle = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'rgba(246,246,246,0.75)',
      backgroundBlendMode: 'overlay'
    };

    var rolesText = this.props.roles.replace(/ /g, ', ');

    return (
      <ModalTrigger 
        modal={<InfoModal 
        id={this.props.key} 
        name={this.props.name} 
        description={this.props.description}/>}>      
          <div className={isotopeClasses} id={this.props.name} style={{cursor:'pointer'}}>
            <div className="repo">
              <div className="repo-header">
                <h2 className="repo-title"><a href={"#"+this.props.name} style={{cursor:'pointer'}}>{this.props.name}</a></h2>
                <h3 className="repo-roles"> {rolesText} </h3>
              </div>
            </div>
            <div className="picture" style={divStyle}></div>
          </div>
      </ModalTrigger>
    )
  }
});


var InfoModal = React.createClass({
  render: function() {
    var imgfilename = this.props.name.replace(/ /g, '-').replace(/&/, '');
    var imgUrl = '/images/partners/'+imgfilename+'.png';
    var divStyle = {
      backgroundImage: 'url(' + imgUrl + ')',
    };
    
    return (
        <Modal title={this.props.name} animation={true} onRequestHide={this.props.onRequestHide}>
          <div className="modal-body">
            <table className="subHead">
            <tr>
            <td style={{verticalAlign:'top'}}>
                <img src={imgUrl} width="586" height="" style={{margin:0,paddingTop:5,paddingRight:10}}/>
            </td>
            </tr>
            <tr>
            <td>
                <p style={{color:'#000',fontSize:14,lineHeight:'1.65em'}}>
                  <span dangerouslySetInnerHTML={{__html:this.props.description}}></span>
                </p>
            </td></tr>
            </table>
          </div>
          <div className="modal-footer">
            <Button onClick={this.props.onRequestHide}>Sluiten</Button>
          </div>
        </Modal>
      );
  }
});


module.exports = PartnersApp;
