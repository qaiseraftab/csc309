class PartiesController < ApplicationController
  before_action :set_party, only: [:show, :edit, :update, :destroy, :rate, :complete]

  # GET /parties
  def index
    @parties = Party.all
  end

  # GET /parties/1
  def show
  end

  # GET /parties/new
  def new
    @party = Party.new
  end

  # GET /parties/1/edit
  def edit
  end

  # POST /parties
  def create
    @party = Party.new(party_params)

    if @party.save
      redirect_to @party, notice: 'Party was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /parties/1
  def update
    if @party.update(party_params)
      redirect_to @party, notice: 'Party was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /parties/1
  def destroy
    @party.destroy
    redirect_to parties_url, notice: 'Party was successfully destroyed.'
  end

  # POST /parties/1/rate
  def rate
    @rating = Rating.new(rating_params)
    @rating.user = current_user
    @rating.party = @party

    if @rating.save
      respond_to do |format|
        format.json { render json: { ok: true, score: @party.rating_score, count: @party.rating_count } }
      end
    else
      respond_to do |format|
        format.json { render json: { ok: false } }
      end
    end
  end

  # POST /parties/1/complete
  def complete
    @party.ended = true
    if (current_user == @party.host) && @party.save
      respond_to do |format|
        format.json { render json: { ok: true, ended: @party.ended } }
      end
    else
      respond_to do |format|
        format.json { render json: { ok: false } }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_party
      @party = Party.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def party_params
      params.require(:party).permit(:name, :capacity, :address, :city, :province, :latitude, :longitude, :description, :posted_date, :start_date, :end_date, :ended, :featured_until, :streaming, :private, :food_provided, :alcohol, :parking, :adult_only)
    end

    def rating_params
      params.require(:rating).permit(:score, :comment)
    end
end
