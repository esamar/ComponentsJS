(function() {
    const template = document.createElement('template');
  
    template.innerHTML = `
    <style>
      :host{
        --first-border-radius: 3px;
        --last-border-radius: 3px;
      }
      button
      {
        float: left;
        border-width: 1px;
        width: 38px;
        padding: 7px;
        font-family: Arial;
        font-size: 12px;
        text-decoration: none;
        background-image: -webkit-linear-gradient(top, #F7F7F7 0%, #C9C7C8 100%);
        border-color: #B6B5B5;
        cursor: pointer;
        outline: none;
      }
      [first]{
        border-top-left-radius: var(--first-border-radius);
        border-bottom-left-radius: var(--first-border-radius);
        border-right:none;
      }
      [middle]{
      
        border-right:none;
      }
      [last]{
        border-top-right-radius: var(--last-border-radius);
        border-bottom-right-radius: var(--last-border-radius);
      }
      .selected
      {
        background-image: -webkit-linear-gradient(top, #2A61BF 0%, #3D7EFF 100%);
        color: white;
        text-decoration: none;
        border-color: #71A0FE;
      }
      div{
        overflow:auto;
        width:76px;
      }
      .disable{
        pointer-events: none;
        filter: grayscale();
        opacity: 0.4;
      }
    </style>
      <div content>
        <button type="button" first>Si</button>
        <button type="button" middle hidden></button>
        <button type="button" last>No</button>
      </div>

    `;
  
    class checkButton extends HTMLElement {
      constructor() 
      {
      
        super();
      
        this.first=this.first.bind(this);
      
        this.middle = this.middle.bind(this);
      
        this.last = this.last.bind(this);
  
        this.attachShadow({ mode: 'open' });
      
        this.shadowRoot.appendChild(template.content.cloneNode(true));
  
        this.contentDiv = this.shadowRoot.querySelector('[content]');
      
        this.firstBtn = this.shadowRoot.querySelector('[first]');
      
        this.middleBtn = this.shadowRoot.querySelector('[middle]');
      
        this.lastBtn = this.shadowRoot.querySelector('[last]');

      }
  
      connectedCallback() 
      {
      
        this.firstBtn.addEventListener('click', this.first);
      
        this.middleBtn.addEventListener('click', this.middle);
      
        this.lastBtn.addEventListener('click', this.last);
  
        if (!this.hasAttribute('value')) 
        {
      
          this.setAttribute('value', 0);
      
        }
      
      }
      
      first()
      {
  
        this.value=1;
  
      }
      
      middle()
      {

        this.value=2;

      }
      
      last()
      {

        this.value=3;

      }  
        
      static get observedAttributes() 
      {
      
        return ['value', 'disabled','disabled-first','disabled-last'];
      
      }
  
      attributeChangedCallback(name, oldValue, newValue) {
        
        if ( name == 'value')
        {

          this.control(newValue); 

        }

        if (name == 'disabled')
        {
      
          if ( newValue === null)
          {

            this.contentDiv.classList.remove('disable');

          }
          else
          {
          
            this.contentDiv.classList.add('disable');
            
          }
        
        }
        
        if (name == 'disabled-first')
        {
        
          if ( newValue === null)
          {

            this.firstBtn.classList.remove('disable');

          }
          else
          {
          
            this.firstBtn.classList.add('disable');
            
          }
        }
        
        if (name == 'disabled-last')
        {
          
          if ( newValue === null)
          {

            this.lastBtn.classList.remove('disable');

          }
          else
          {
          
            this.lastBtn.classList.add('disable');
            
          }
        
        }
      
      }

      control(value)
      {
      
        this.shadowRoot.querySelectorAll('button').forEach((btn)=>
        {
        
          btn.classList.remove('selected');
        
        });
        
        switch(+value)
        {
          
          case 1:
          
            this.firstBtn.classList.add('selected');
          
            break;
          
          case 2:
          
            this.middleBtn.classList.add('selected');
          
              break;
          
          case 3:
      
            this.lastBtn.classList.add('selected');
        
            break;
        
        }
      
      }

      get value() 
      {
      
        return this.getAttribute('value');
      
      }
      
      set value(newValue) 
      {
      
        this.setAttribute('value', newValue);
      
      }
  
      disconnectedCallback() 
      {
      
        this.firstBtn.removeEventListener('click', this.first);
      
        this.middleBtn.removeEventListener('click', this.middle);
      
        this.lastBtn.removeEventListener('click', this.last);
      
      }
    
    }

    window.customElements.define('check-button', checkButton);
  
  })();
