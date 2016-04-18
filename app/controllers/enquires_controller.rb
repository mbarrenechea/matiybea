class EnquiresController < ApplicationController
  before_action :set_enquire, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json

  # GET /enquires
  def index
    @enquires = Enquire.all
    respond_with(@enquires)
  end

  # GET /enquires/1
  def show
    respond_with(@enquire)
  end

  # GET /enquires/new
  def new
    @enquire = Enquire.new
  end

  # GET /enquires/1/edit
  def edit
  end

  # POST /enquires
  def create
    @enquire = Enquire.new(enquire_params)

    if @enquire.save
      respond_with(@enquire)
    end
  end

  # PATCH/PUT /enquires/1
  def update
    if @enquire.update(enquire_params)
      respond_with @enquire
    end
  end

  # DELETE /enquires/1
  def destroy
    @enquire.destroy
    redirect_to enquires_url, notice: 'Enquire was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_enquire
      @enquire = Enquire.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def enquire_params
      params.require(:enquire).permit(:name, :score)
    end
end
